const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 3000;
const cors = require("cors");
var jsonServer = require("json-server");
var server = jsonServer.create();
var router = jsonServer.router("./db/db.json");
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, function() {
  console.log("JSON Server is running");
});

if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

const blogRoutes = require("./src/routes/main.js");

app.use("/blog", blogRoutes);

app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Da blog is running on ${port}!`);
  });
}
module.exports = app;
