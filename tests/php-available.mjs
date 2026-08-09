import { spawnSync } from 'node:child_process';

let cached;

export const phpAvailable = () => {
  if (cached !== undefined) return cached;
  try {
    const result = spawnSync('php', ['-v'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
    cached = result.status === 0;
  } catch {
    cached = false;
  }
  return cached;
};
