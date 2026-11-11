import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

export const notesRouter = Router();

notesRouter.get('/', getAllNotes);
notesRouter.get('/:noteId', getNoteById);
notesRouter.post('/', createNote);
notesRouter.patch('/:noteId', updateNote);
notesRouter.delete('/:noteId', deleteNote);
