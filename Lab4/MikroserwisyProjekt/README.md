# Lab4 project: microservices in Node.js
This project consists of three independent microservices, all comunicating with eachother.

## Tech stack:
1. Runtime environment used: `Node.js` (a runtime)
2. Backend-handling: `Express.js` (a framework) and ORM (Object-relational mapping), here: `Sequalize` (library)
3. DBs: `SQLite3` (drivers, probably?)
4. Encryption, not storing passwords in plaintext: `Bcrypt` (library)
5. Authentication: `jsonwebtoken`, JWT (library)
6. Sending requests: `Axios` (library)

## DevDependencies:
1. `Nodemon`: for dynamically restarting the server
2. `@types/...`: used with Express and Node, to have a better experience with IntelliSense
