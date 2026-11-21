import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

const noteId = Joi.string().custom((value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }

  return value;
});

const noteFields = {
  title: Joi.string().min(1).trim(),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
};

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow('').default(''),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId,
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    ...noteFields,
  }).required(),
};

export const updateNoteSchema = {
  params: Joi.object({
    noteId,
  }),
  body: Joi.object(noteFields).min(1).required(),
};
