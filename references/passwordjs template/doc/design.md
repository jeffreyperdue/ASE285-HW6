# HW6 - Software Design Document

## Architecture Overview

The system consists of three main modules: `makepassword.js`, `passwordjs.js`, and `utility.js`. These interact with input/output files and a MongoDB database.

Below is a simplified architecture diagram showing the flow of information:

```
+------------------+        +---------------------+         +----------------------+
|  password.txt    | -----> |  makepassword.js    | ----->  |  password.enc.txt     |
| (email:password) |        | - hashes passwords  |         | (email:hashedPassword)|
|                  |        | - writes to file    |         +----------------------+
|                  |        | - uploads to DB     |
+------------------+        |                     |
                             |                     |        +----------------------+
                             |                     | -----> | MongoDB (via Mongoose)|
                             |                     |        |  users collection     |
                             +---------------------+        +----------------------+

                                                  ↓
                                        +------------------+
                                        | passwordjs.js     |
                                        | - reads enc file  |
                                        | - verifies login  |
                                        +------------------+
```

## Module Responsibilities

### makepassword.js
- Reads `password.txt` and parses each email:password line.
- Hashes passwords using the SHA-256 algorithm (via `utility.js`).
- Writes the resulting email:hashedPassword pairs to `password.enc.txt`.
- Uploads each user into MongoDB using the Mongoose `User` model.

### passwordjs.js
- Accepts user input (email and password) via command line.
- Reads `password.enc.txt` and checks if the provided credentials match any stored record.
- Returns `true` or `false` for login validation.
- Future version may validate directly against MongoDB.

### utility.js
- Contains helper functions for:
  - Reading a file into an array of lines.
  - Writing content to a file.
  - Hashing strings using SHA-256.

### models/User.js
- Defines the Mongoose schema for users:
  - `email` (String, required, unique)
  - `passwordHash` (String, required)
- Enables upsert-based insert/update operations.

## Input and Output Flow

1. The system begins with a raw input file, `password.txt`, containing `email:password` pairs.
2. `makepassword.js` reads this file, hashes each password, and:
   - Writes results to `password.enc.txt`.
   - Uploads records to MongoDB Atlas via Mongoose.
3. `passwordjs.js` accepts command-line arguments (email, password) and:
   - Checks the provided credentials against the hashed entries in `password.enc.txt`.
   - Returns `Login successful!` or `Login failed.`

## Design Rationale

- **Modularity**: Each script handles a distinct function (hashing, verifying, file I/O), making testing and reuse easier.
- **Compatibility**: Designed to work both with file-based storage and a remote MongoDB backend.
- **Security**: SHA-256 hashing ensures plaintext passwords are never stored or transmitted.
- **Testability**: Unit and integration tests cover file operations and database interaction.

