const mongoose = require('mongoose');
const User = require('../src/models/User');

const mongoURI = 'mongodb+srv://perduej7:qE5PYGiY2cCoBfoA@cluster0.vrbgkwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

beforeAll(async () => {
  await mongoose.connect(mongoURI, { dbName: 'hw6db' });
});

afterAll(async () => {
  await User.deleteOne({ email: 'testuser@example.com' }); 
  await mongoose.disconnect();
});

test('can insert and retrieve user from MongoDB', async () => {
  const testUser = {
    email: 'testuser@example.com',
    passwordHash: 'testhashedpassword123'
  };

  await User.create(testUser);

  const found = await User.findOne({ email: 'testuser@example.com' });
  expect(found).not.toBeNull();
  expect(found.email).toBe(testUser.email);
  expect(found.passwordHash).toBe(testUser.passwordHash);
});
