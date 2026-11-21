import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import pinoHttp from 'pino-http';

import { initMongoConnection } from './db/initMongoConnection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import notesRouter from './routes/notesRoutes.js';

dotenv.config();

export const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use('/notes', notesRouter);

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await initMongoConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
