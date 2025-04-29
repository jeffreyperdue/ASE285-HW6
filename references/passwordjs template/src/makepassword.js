const { readFile, writeFile, hash } = require('./utility');
const mongoose = require('mongoose');
const User = require('./models/User');

async function makepassword(inputFile = 'password.txt', outputFile = 'password.enc.txt') {
  try {
    const lines = await readFile(inputFile);

    const hashedLines = lines.map(line => {
      const [email, password] = line.split(':');
      const hashedPassword = hash(password.trim());
      return `${email.trim()}:${hashedPassword}`;
    });

    const output = hashedLines.join('\n');
    await writeFile(outputFile, output);
    console.log(`${outputFile} successfully created.`);

    const mongoURI = 'mongodb+srv://perduej7:qE5PYGiY2cCoBfoA@cluster0.vrbgkwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI, { dbName: 'hw6db' });
    console.log('Connected to MongoDB');

    for (const line of hashedLines) {
      const [email, passwordHash] = line.split(':');
      await User.findOneAndUpdate(
        { email },
        { passwordHash },
        { upsert: true, new: true }
      );
    }

    console.log('Users uploaded to MongoDB');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error in makepassword:', err);
  }
}

if (require.main === module) {
  makepassword();
}

module.exports = { makepassword };
