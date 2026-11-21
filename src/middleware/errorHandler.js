import { isCelebrateError } from 'celebrate';

export const errorHandler = (err, _req, res, _next) => {
  if (isCelebrateError(err)) {
    return res.status(400).json({
      message: 'Validation error',
      details: err.details,
    });
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Server error';

  return res.status(status).json({ message });
};

export default errorHandler;
