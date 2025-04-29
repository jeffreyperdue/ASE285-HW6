// passwordjs.js

const { readFile, hash } = require('./utility');

async function passwordjs(email, password, encFile = 'password.enc.txt') {
  try {
    // Step 1: Read the password.enc.txt file
    const data = await readFile(encFile);
    const lines = data.toString().split('\n').filter(line => line.trim() !== '');

    // Step 2: Search for the user's email
    for (const line of lines) {
      const [savedEmail, savedHash] = line.split(':');
      if (savedEmail.trim() === email.trim()) {
        // Step 3: Hash the given password
        const givenHash = hash(password.trim());

        // Step 4: Compare hashes
        return savedHash.trim() === givenHash;
      }
    }

    // Step 5: If email not found, return false
    return false;
  } catch (err) {
    console.error('Error in passwordjs:', err);
    return false;
  }
}

// Only run if called directly
if (require.main === module) {
    const [,, encFile, email, password] = process.argv;
    passwordjs(email, password, encFile).then(result => {
      if (result) {
        console.log('Login successful!');
      } else {
        console.log('Login failed.');
      }
    });
  }
  

module.exports = { passwordjs };
