# NeuroCare

A sentiment-based mental health tracker with an AI-powered chatbot.

## Project Overview

NeuroCare helps users track their mental health through journaling, sentiment analysis, and chatbot interaction. It provides insights on mood patterns over time, powered by an Express + Prisma backend and a React + Vite frontend. The app also integrates an AI chatbot (Google Gemini) for supportive, contextual conversations.

## Key Features

- Daily mood journaling with sentiment analysis
- Interactive AI-powered chatbot (Gemini)
- Dashboard with mood trends and insights
- Secure authentication using Firebase and JWT
- Data persisted in a Postgres database via Prisma

## Tech Stack

- Backend: Node.js, Express, Prisma, Postgres
- Frontend: React, Vite, MUI (inside `neurocare/`)
- AI: Google Gemini (Generative AI) integration
- Auth: Firebase Admin (service account) + JWT
- Sentiment: VADER sentiment (and optional Python script under `prisma/SentimentAnalysis/`)

## Repo Structure (high level)

- `backend/` — Express API, Prisma, routes, controllers, middleware
- `neurocare/` — React frontend (Vite)
- `prisma/` — Prisma migrations and (optional) sentiment utilities

## Getting Started

Prerequisites

- Node.js (v18+ recommended)
- npm or Yarn
- PostgreSQL (or a compatible database)
- Firebase service account for authentication (if using Firebase auth)

### Backend (API)

1. Open a terminal and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` and set the environment variables (see list below).

3. Apply Prisma migrations and generate the client:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the server:

```bash
npm run start
```

The backend listens on `PORT` (default `5000`).

### Frontend (Web App)

1. From the project root:

```bash
cd neurocare
npm install
npm run dev
```

2. Open the app at `http://localhost:5173` (default Vite port).

### Optional: Python Sentiment Utilities

There is an optional sentiment analysis script under `prisma/SentimentAnalysis/Sentiment.py`. If you plan to use or adapt that, make sure you have a compatible Python environment and required packages (see the file for details).

## Environment Variables

Create a `.env` file for the backend with at least the following keys (example values omitted):

- `PORT` — server port (optional)
- `DATABASE_URL` — Postgres connection string used by Prisma
- `JWT_SECRET` — secret used to sign JWT tokens
- `FIREBASE_SERVICE_ACCOUNT` — JSON string of your Firebase service account (ensure newlines are escaped or stored as a single JSON string)
- `GEMINI_API_KEY` — API key for Google Generative AI (Gemini)
- `GEMINI_MODEL` — optional model id (defaults used in code if omitted)

Notes:

- `FIREBASE_SERVICE_ACCOUNT` is read as JSON in `backend/middleware/authenticate.js` and its `private_key` often needs `\n` newlines handled correctly.

## API Overview

Key routes (backend):

- `GET /` — simple health check
- `POST /api/auth/login` — login route (returns JWT)
- `POST /api/chat/chat` — chat endpoint that proxies prompts to Gemini
- `POST /api/journal` — journal entry CRUD (protected)
- `POST /api/sentiment` — sentiment analysis endpoints (protected)
- Feature usage and analytics routes under `/api` (protected)

Authentication: routes under `/api` are protected via Firebase token verification in `backend/middleware/authenticate.js`. Include a header `Authorization: Bearer <firebase_id_token>`.

## Development Tips

- Use `nodemon` (already present in `backend/devDependencies`) while developing the backend.
- Frontend uses Vite; hot reload works out of the box with `npm run dev` inside `neurocare/`.
- The chat integration calls Google Gemini — ensure `GEMINI_API_KEY` is set and has the required permissions.

## Contributing

Contributions are welcome. Please open issues or pull requests with a clear description of the change.

## License

This repository does not include a license file. Add a `LICENSE` if you plan to open-source the project.

---

If you'd like, I can also:

- Add a sample `.env.example` file in `backend/` listing required variables
- Create a quick start script to run the backend + frontend concurrently
- Expand the API reference from route files with request/response examples

Tell me which of those you'd like next.
