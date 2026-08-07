#!/usr/bin/env node
import net from 'node:net';
import { readFileSync } from 'node:fs';

const host = process.env.LEDKASA_TEST_SMTP_HOST || '127.0.0.1';
const port = Number(process.env.LEDKASA_TEST_SMTP_PORT || '25');

const raw = readFileSync(0, 'utf8');
const headerMatch = raw.match(/^([\s\S]*?)\r?\n\r?\n([\s\S]*)$/);
const headers = headerMatch?.[1] ?? '';
const body = headerMatch?.[2] ?? raw;
const subject = headers.match(/^Subject:\s*(.+)$/im)?.[1]?.trim() || 'LEDKASA test message';
const fromHeader = headers.match(/^From:\s*(.+)$/im)?.[1] ?? 'no-reply@ledkasa.com.tr';
const fromAddress = fromHeader.match(/<([^>]+)>/)?.[1] || fromHeader.replace(/^.*\s/, '').trim();
const recipient = process.env.LEDKASA_CONTACT_RECIPIENT || 'quotes@example.com';

const readResponse = (socket) => new Promise((resolve, reject) => {
  let buffer = '';
  const onData = (chunk) => {
    buffer += chunk;
    const lines = buffer.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) return;
    const last = lines.at(-1);
    if (/^\d{3} /.test(last)) {
      cleanup();
      resolve(buffer);
    }
  };
  const onError = (error) => {
    cleanup();
    reject(error);
  };
  const cleanup = () => {
    socket.off('data', onData);
    socket.off('error', onError);
  };
  socket.on('data', onData);
  socket.on('error', onError);
});

const socket = net.connect({ host, port });
socket.on('error', () => {});
await new Promise((resolve, reject) => {
  socket.once('connect', resolve);
  socket.once('error', reject);
});
socket.setEncoding('utf8');

await readResponse(socket);
socket.write('HELO localhost\r\n');
await readResponse(socket);
socket.write(`MAIL FROM:<${fromAddress}>\r\n`);
await readResponse(socket);
socket.write(`RCPT TO:<${recipient}>\r\n`);
await readResponse(socket);
socket.write('DATA\r\n');
await readResponse(socket);
socket.write(`From: ${fromHeader}\r\nTo: ${recipient}\r\nSubject: ${subject}\r\n\r\n${body}\r\n.\r\n`);
await readResponse(socket);
socket.destroy();
process.exit(0);
