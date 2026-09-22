import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

const options = { N: 131072, r: 8, p: 1, maxmem: 160 * 1024 * 1024 };
const derive = (password, salt) => new Promise((resolve, reject) => {
  scrypt(password, salt, 64, options, (error, key) => error ? reject(error) : resolve(key));
});

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt);
  return `scrypt$${salt}$${key.toString('hex')}`;
}

export async function verifyPassword(password, encoded) {
  const parts = typeof encoded === 'string' ? encoded.split('$') : [];
  const valid = parts.length === 3 && parts[0] === 'scrypt' && /^[a-f0-9]{32}$/.test(parts[1]) && /^[a-f0-9]{128}$/.test(parts[2]);
  // Unknown accounts perform the same expensive derivation as known accounts.
  const salt = valid ? parts[1] : '0'.repeat(32);
  const expected = Buffer.from(valid ? parts[2] : '0'.repeat(128), 'hex');
  const actual = await derive(password, salt);
  return timingSafeEqual(actual, expected) && valid;
}
