HW6.md
# HW6 - Encrypted Password Manager

## Overview

This project implements a secure password manager application using Node.js, MongoDB, and Mongoose.  
It processes a plaintext file (`password.txt`) containing users' email addresses and passwords, hashes the passwords using SHA-256, generates an encrypted output file (`password.enc.txt`), and uploads the user data into a MongoDB database.  
The application also verifies user credentials and includes full unit and acceptance tests.

---

##  File Structure

passwordjs template/
├── acceptance.bat               # Acceptance test script
├── password.txt                 # Input: email:password list
├── password.enc.txt             # Output: email:hashedPassword list
├── HW6.md                       # Project overview and usage guide
├── package.json                 # Dependencies and scripts
├── src/
│   ├── makepassword.js          # Hashing + DB upload logic
│   ├── passwordjs.js            # Password verification logic
│   ├── utility.js               # File I/O and hashing functions
│   └── models/
│       └── User.js              # Mongoose schema
├── tests/
│   ├── makepassword.test.js     # Tests file writing logic
│   ├── passwordjs.test.js       # Dummy placeholder
│   └── db.test.js               # Tests MongoDB integration
├── doc/
│   ├── design.md                # System architecture & module design
│   └── requirements.md          # User stories and expectations
```

 

##  How to Run the Application

###  Hash and Upload User Credentials

```bash
node src/makepassword.js


Reads password.txt

Creates password.enc.txt

Uploads users into MongoDB Atlas (hw6db.users collection)

Verify a User Login (File-Based Check)
node src/passwordjs.js password.enc.txt user@example.com userpassword


Displays "Login successful!" or "Login failed."

Run Acceptance Tests
.\acceptance.bat


Tests multiple valid and invalid login scenarios.

Running Unit Tests
npm install
npm test


This runs the Jest unit tests:

makepassword.test.js — verifies file creation

passwordjs.test.js — dummy test to satisfy test suite

db.test.js — verifies MongoDB storage and retrieval

User Manual
1. Add New Users

Edit password.txt:

user1@example.com:plaintextpassword1
user2@example.com:plaintextpassword2
...


Each line must follow the format email:password.

After editing, run:

node src/makepassword.js


This will update:

password.enc.txt

Your MongoDB database with new/updated users

2. Verify User Login

Run:

node src/passwordjs.js password.enc.txt user@example.com userpassword


You will see one of:

"Login successful!"

"Login failed."

3. View Stored Encrypted Passwords

Open password.enc.txt:

user1@example.com:3fa85f64b7894a5e8b589321ca8217e3c5e674fc3b1c2f429aa5c5bb1db4e829
user2@example.com:6276a14c2b9d80af2bd9c295098e2e8d2d330cf3d647f9bd9949c64c7f77b640
...


Email addresses are stored alongside the SHA-256 hashed passwords.