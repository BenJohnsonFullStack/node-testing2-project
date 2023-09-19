const db = require("../../data/db-config");

const get = () => {
  return db("pets");
};

module.exports = {
  get,
};
