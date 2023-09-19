const express = require("express");
const petsRouter = require("./pets/pets-router");

const server = express();

server.use(express.json());
server.use("/api/pets", petsRouter);

server.use("*", (req, res) => {
  res.json("Hello from pets");
});

// ERROR HANDLING MIDDLEWARE //
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
// ERROR HANDLING MIDDLEWARE //

module.exports = server;
