<h1 align="center">BACKEND ASSIGNMENT (AUTHENTICATION SYSTEM)</h1>
<p align="center">This is the backend assignment</p>
<hr/>

## Tech Stack Used
- Node.JS
- Typescript
- Zod (Validation)
- PostgreSQL
- Prisma

## Features:
- Login
- Signup
- Role Based Auth for user/ admin
- Reset pass (using Tokenized url method)
- Modularized Codebase

## Setup Steps:
- clone the repo: ``` git clone git@github.com:vivek6201/auth-assignment.git ```
- install all packages: ``` pnpm install ```
- copy env.example to .env: ``` cp .env.example .env ```
- start the server: ``` pnpm dev ```

## Sample .env.example
```
DATABASE_URL="postgresql://postgres:mysecretpass@localhost:5432/mydb?schema=public"
PORT = 4001
JWT_SECRET = mysecret
APP_URL = http://localhost:4001
```