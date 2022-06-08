
const express = require("express");

const userRoutes = require("./route/usersRoutes");



const app = express();

app.use(express.json());



// mouting Multiple router
app.use("/user", userRoutes);

// app.all("*", (req, res, next) => {
//   next(new ErrorHandler(`cant find ${req.originalUrl} on this server`, 404));
// });

// app.use(errorMiddleware);

module.exports = app;