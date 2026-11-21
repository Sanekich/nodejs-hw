# nodejs-hw

Express and MongoDB API for the notes assignment.

## Setup

Install dependencies and create a local environment file:

```bash
npm install
cp .env.example .env
npm run dev
```

Set `MONGO_URL` to a reachable MongoDB connection string. `PORT` defaults to `3000` when it is not set.

## Endpoints

`GET /notes` returns paginated notes. It accepts `page`, `perPage`, `tag`, and `search` query parameters. `perPage` must be between 5 and 20, and text search checks both `title` and `content`.

`GET /notes/:noteId` returns one note. `POST /notes` creates a note, `PATCH /notes/:noteId` updates at least one field, and `DELETE /notes/:noteId` removes a note. The API validates all query parameters, route IDs, and request bodies with `celebrate`.

`GET /test-error` simulates a server error. Unknown routes return `404` with `{ "message": "Route not found" }`.
