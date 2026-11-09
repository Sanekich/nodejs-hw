# nodejs-hw

Express server for the notes collection assignment.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The server uses `PORT` from `.env` and defaults to port `3000`.

## Endpoints

- `GET /notes` — returns `{ "message": "Retrieved all notes" }`
- `GET /notes/:noteId` — returns the requested note ID in the message
- `GET /test-error` — simulates a server error
- Any other route — returns `404` and `{ "message": "Route not found" }`
