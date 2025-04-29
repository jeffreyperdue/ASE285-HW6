# HW6 - Requirements Specification

## Problem Statement

This system is designed to securely manage user credentials. It accepts a plaintext file of user email:password pairs, hashes each password using the SHA-256 algorithm, and writes the resulting email:hashedPassword pairs to a new file. Additionally, the hashed credentials are uploaded into a MongoDB database using Mongoose. The system allows for user credential verification through a CLI-based login checker that returns a true or false result.

## Functional Requirements (User Stories)

### User Story 1: Data Encryption
As a system administrator,  
I want to process a plaintext file of user email:password pairs  
So that I can generate an encrypted file containing hashed passwords.

### User Story 2: Database Integration
As a system administrator,  
I want to upload hashed credentials into a MongoDB database  
So that the system can later verify users against stored credentials.

### User Story 3: Login Verification
As a user,  
I want to provide my email and password to the system  
So that it can verify whether my credentials are valid or not.

### User Story 4: File Storage
As a developer,  
I want to write hashed credentials to a text file  
So that the application works even without a database connection.

### User Story 5: Testing and Validation
As a developer,  
I want to run unit and integration tests  
So that I can verify file reading, hashing, and MongoDB operations work correctly.

## Non-Functional Requirements

- Passwords must never be stored or transmitted in plaintext.
- The hashing algorithm used must be SHA-256.
- File read/write operations must not corrupt data.
- MongoDB operations must support upsert to avoid duplication.
- The CLI application must return clear success/failure messages.

## Acceptance Criteria

- The application reads `password.txt` and creates a correctly formatted `password.enc.txt`.
- All users in the file are uploaded to MongoDB using Mongoose.
- The `passwordjs.js` module returns true only when email and password match.
- Acceptance test (`acceptance.bat`) runs successfully, confirming multiple valid and invalid login attempts.
- Unit tests pass without failure using Jest.

