# Google Forms Lite Clone

A simplified clone of Google Forms built as a monorepo with React + TypeScript on the frontend and GraphQL on the backend.

---

## Tech Stack

**Frontend:** React, TypeScript, Redux Toolkit, RTK Query, React Router, Vite

**Backend:** Node.js, Apollo Server, GraphQL, Express

---

## Project Structure

```
google-forms-lite/
├── client/          # React frontend
├── server/          # GraphQL backend
├── package.json     # Root monorepo config
└── README.md
```

---

## Prerequisites

- Node.js v18+
- npm v9+

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <https://github.com/BohdanSV-main/testTask_GoogleFormClone>
cd google-forms-lite
```

### 2. Install dependencies

Install all dependencies for both client and server:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

---

## Running the Project

**Server** (runs on http://localhost:4000/graphql):

```bash
cd server
npm run dev
```

**Client** (runs on http://localhost:5173):

```bash
cd client
npm run dev
```

---

## GraphQL API

Once the server is running, open **http://localhost:4000/graphql** to access Apollo Sandbox where you can explore and test all queries and mutations.

---

## Available Scripts

### Client

| Script            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start development server                          |
| `npm run build`   | Build for production                              |
| `npm run codegen` | Regenerate GraphQL types (server must be running) |

### Server

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start server with hot reload |
| `npm run build` | Compile TypeScript           |
| `npm run start` | Run compiled server          |

---

## Notes

- Data is stored **in-memory** on the server — all data is lost on server restart
- No authentication is required
- Codegen requires the server to be running: `npm run codegen` inside `client/`
