const ErrorResponse = require('../utils/errorResponse');

module.exports = errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode || 500).json({
    message: error.message || 'Server Error',
  });
};
