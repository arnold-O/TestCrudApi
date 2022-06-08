const ErrorHandler = require("../utils/errorHandler");

const handleCAstDBError = (err) => {
  const message = `user not found, invalid ${err.path}`;
  return new ErrorHandler(message, 400);
};
const handleValidationError = (err) => {
  const message = Object.values(err.errors).map((value) => value.message);
  return new ErrorHandler(message, 400);
};



module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongoose Object Id Error
  let error = { ...err };
  
  if (err.name === "CastError") err = handleCAstDBError(err);

  // hadlimg mongoose validation Error
  if (err.name === "validationError") err = handleValidationError(err);

  

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
