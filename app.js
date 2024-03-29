const express = require("express");

const db = require("./data/database");
const todoRoutes = require("./routes/todo-routes");
const corsMiddleware = require("./middlewares/cors");

const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use(todoRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).json({
    message: "Something went wrong!",
  });
});

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connecting to the database failed: " + error);
  });
