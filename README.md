# Notes API

Express REST API for notes using MongoDB and Mongoose. The project implements the `02-mongodb` homework requirements.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set the MongoDB connection string:

   ```env
   PORT=3000
   MONGO_URL=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   ```

3. Start the server:

   ```bash
   npm start
   ```

The server connects to MongoDB before listening for requests.

## API endpoints

- `GET /notes` — return all notes
- `GET /notes/:noteId` — return one note
- `POST /notes` — create a note
- `PATCH /notes/:noteId` — update a note
- `DELETE /notes/:noteId` — delete a note

A missing route returns `{ "message": "Route not found" }`. A missing note returns a 404 with `{ "message": "Note not found" }`.

## Render deployment

Create a Web Service on Render connected to the `02-mongodb` branch. Use:

- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `PORT` and `MONGO_URL`

The MongoDB Atlas Network Access list must allow the Render service to connect, commonly by adding `0.0.0.0/0`.

`notes.json` contains sample documents that can be imported into the `notes` collection in MongoDB Atlas or MongoDB Compass.
