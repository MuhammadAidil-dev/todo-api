const errorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || 'Internal server error';
  console.log(`PATH: Error in path ${req.path}`, error);
  return res.status(statusCode).json({
    message,
    status: 'error',
  });
};

export default errorHandler;
