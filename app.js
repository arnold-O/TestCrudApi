
const express = require("express");

const userRoutes = require("./route/usersRoutes");
const errormiddleware = require("./utils/error");
const ErrorHandler = require("./utils/errorHandler");



const app = express();

app.use(express.json());



// mounting  router
app.use("/user", userRoutes);

// handling routes that were not handled
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`cant find ${req.originalUrl} on this server`, 404));
});

// global middleware, handling errors
app.use(errormiddleware);

module.exports = app;