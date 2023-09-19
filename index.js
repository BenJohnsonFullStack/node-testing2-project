const server = require("./api/server");

const PORT = process.env.NODE_ENV || 9000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
