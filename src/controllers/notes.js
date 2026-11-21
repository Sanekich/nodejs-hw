import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getAllNotes = async (req, res) => {
  const { page, perPage, tag, search } = req.query;
  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ title: searchRegex }, { content: searchRegex }];
  }

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean(),
    Note.countDocuments(filter),
  ]);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPage),
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId).lean();

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndDelete(noteId).lean();

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findByIdAndUpdate(noteId, req.body, {
    new: true,
    runValidators: true,
  }).lean();

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};
