const p = require('../src/makepassword');
const u = require('../src/utility');
const fs = require('fs').promises;
const path = require('path');

describe('makepassword should create file', () => {
  const fileName = './tests/passwordtest.txt';
  const encFileName = './tests/passwordtest.enc.txt';
  
  beforeAll(async () => {
    const inputContent = 'user1@example.com:password123\nuser2@example.com:qwerty';
    await fs.writeFile(fileName, inputContent);
  });

  afterAll(async () => {
    await fs.unlink(fileName);
    await fs.unlink(encFileName);
  });

  test('creates the encrypted password file correctly', async () => {
    // Check it does not exist
    let existsBefore = false;
    try {
      await fs.access(encFileName);
      existsBefore = true;
    } catch {
      existsBefore = false;
    }
    expect(existsBefore).toBe(false);

    // Generate file
    await p.makepassword(fileName, encFileName);

    // Check it now exists
    let existsAfter = false;
    try {
      await fs.access(encFileName);
      existsAfter = true;
    } catch {
      existsAfter = false;
    }
    expect(existsAfter).toBe(true);

    // Check contents
    const encContent = await fs.readFile(encFileName, 'utf-8');
    const lines = encContent.split('\n').filter(line => line.trim() !== '');
    expect(lines.length).toBeGreaterThanOrEqual(2);

    const [user1, user2] = lines;
    expect(user1.startsWith('user1@example.com:')).toBe(true);
    expect(user2.startsWith('user2@example.com:')).toBe(true);

    expect(user1.includes('password123')).toBe(false);
    expect(user2.includes('qwerty')).toBe(false);
  });
});
