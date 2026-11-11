import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (req.log) {
    req.log.error({ err }, 'Request failed');
  }

  const status = isHttpError(err) ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
};
