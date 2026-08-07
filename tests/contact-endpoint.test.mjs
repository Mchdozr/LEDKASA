import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, rmSync } from 'node:fs';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';

const projectRoot = resolve(import.meta.dirname, '..');
const publicRoot = resolve(projectRoot, 'public');
const validSubmission = {
  name: 'Test Kullanıcısı',
  email: 'test@example.com',
  phone: '',
  company: '',
  product: 'cnc-led-kasa',
  message: 'Test ortamından geçerli teklif talebi.',
  website: '',
  kvkk_consent: 'on',
};

const listenOnFreePort = async () => {
  const probe = net.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const { port } = probe.address();
  await new Promise((resolveClose, reject) => probe.close((error) => error ? reject(error) : resolveClose()));
  return port;
};

const startFakeSmtp = async () => {
  let acceptedMessages = 0;
  const sockets = new Set();
  const server = net.createServer((socket) => {
    sockets.add(socket);
    socket.on('close', () => sockets.delete(socket));
    socket.setEncoding('utf8');
    socket.write('220 localhost ESMTP\r\n');
    let buffer = '';
    let receivingData = false;

    socket.on('data', (chunk) => {
      buffer += chunk;
      while (buffer.includes('\n')) {
        const newline = buffer.indexOf('\n');
        const line = buffer.slice(0, newline).replace(/\r$/, '');
        buffer = buffer.slice(newline + 1);

        if (receivingData) {
          if (line === '.') {
            receivingData = false;
            acceptedMessages += 1;
            socket.write('250 2.0.0 queued\r\n');
          }
          continue;
        }

        const command = line.toUpperCase();
        if (command.startsWith('EHLO') || command.startsWith('HELO')) socket.write('250-localhost\r\n250 OK\r\n');
        else if (command.startsWith('MAIL FROM:') || command.startsWith('RCPT TO:')) socket.write('250 OK\r\n');
        else if (command === 'DATA') {
          receivingData = true;
          socket.write('354 End data with <CR><LF>.<CR><LF>\r\n');
        } else if (command === 'QUIT') {
          socket.write('221 Bye\r\n');
          socket.end();
        } else if (command === 'RSET' || command === 'NOOP') socket.write('250 OK\r\n');
        else socket.write('250 OK\r\n');
      }
    });
  });

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return {
    port: server.address().port,
    acceptedMessages: () => acceptedMessages,
    close: async () => {
      for (const socket of sockets) socket.destroy();
      await new Promise((resolveClose, reject) => server.close((error) => error ? reject(error) : resolveClose()));
    },
  };
};

const startPhpEndpoint = async (smtpPort, rateLimitDirectory) => {
  const port = await listenOnFreePort();
  const process = spawn('php', [
    '-d', 'SMTP=127.0.0.1',
    '-d', `smtp_port=${smtpPort}`,
    '-S', `127.0.0.1:${port}`,
    '-t', publicRoot,
  ], {
    cwd: projectRoot,
    env: {
      ...globalThis.process.env,
      LEDKASA_CONTACT_RATE_LIMIT_DIR: rateLimitDirectory,
      LEDKASA_CONTACT_RECIPIENT: 'quotes@example.com',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  let diagnostics = '';
  process.stderr.setEncoding('utf8');
  process.stderr.on('data', (chunk) => { diagnostics += chunk; });

  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (process.exitCode !== null) throw new Error(`PHP server exited early:\n${diagnostics}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/contact.php`);
      if (response.status === 405) {
        return {
          origin: `http://127.0.0.1:${port}`,
          close: async () => {
            process.kill();
            await once(process, 'exit').catch(() => {});
          },
        };
      }
    } catch {}
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 50));
  }

  process.kill();
  throw new Error(`PHP server did not become ready:\n${diagnostics}`);
};

const postSubmission = (origin, headers = {}) => fetch(`${origin}/contact.php`, {
  method: 'POST',
  headers: { Accept: 'application/json', ...headers },
  body: new URLSearchParams(validSubmission),
});

const withEndpoint = async (callback) => {
  const rateLimitDirectory = mkdtempSync(join(tmpdir(), 'ledkasa-contact-limit-'));
  const smtp = await startFakeSmtp();
  const endpoint = await startPhpEndpoint(smtp.port, rateLimitDirectory);
  try {
    await callback({ endpoint, smtp });
  } finally {
    await endpoint.close();
    await smtp.close();
    rmSync(rateLimitDirectory, { recursive: true, force: true });
  }
};

test('contact endpoint accepts a legitimate same-origin browser post', async () => {
  await withEndpoint(async ({ endpoint, smtp }) => {
    const response = await postSubmission(endpoint.origin, {
      Origin: endpoint.origin,
      'Sec-Fetch-Site': 'same-origin',
    });
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(smtp.acceptedMessages(), 1, 'A legitimate post must reach the configured mail transport once.');
  });
});

test('contact endpoint rejects cross-site browser posts before mail delivery', async () => {
  await withEndpoint(async ({ endpoint, smtp }) => {
    for (const headers of [
      { Origin: 'https://attacker.example', 'Sec-Fetch-Site': 'same-origin' },
      { Origin: endpoint.origin, 'Sec-Fetch-Site': 'cross-site' },
    ]) {
      const response = await postSubmission(endpoint.origin, headers);
      const body = await response.json();
      assert.equal(response.status, 403);
      assert.equal(body.ok, false);
      assert.doesNotMatch(body.message, /mail|quotes@example\.com|info@ledkasa\.com\.tr/i);
    }
    assert.equal(smtp.acceptedMessages(), 0, 'Rejected cross-site posts must not reach mail().');
  });
});

test('contact endpoint rate-limits repeated non-browser posts per IP with a generic response', async () => {
  await withEndpoint(async ({ endpoint, smtp }) => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await postSubmission(endpoint.origin);
      assert.equal(response.status, 200, `legitimate request ${attempt + 1} must remain accepted`);
      assert.equal((await response.json()).ok, true);
    }

    const throttled = await postSubmission(endpoint.origin);
    const body = await throttled.json();
    assert.equal(throttled.status, 429);
    assert.equal(body.ok, false);
    assert.doesNotMatch(body.message, /mail|recipient|quotes@example\.com|info@ledkasa\.com\.tr/i);
    assert.equal(smtp.acceptedMessages(), 5, 'The throttled request must not invoke mail().');
  });
});
