export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode ?? err.status ?? 500;
  const message = err.message || 'Internal Server Error';

  if (res.headersSent) {
    return next(err);
  }

  if (req.log) {
    req.log.error({ err }, 'Request failed');
  }

  res.status(status).json({ message });
};
