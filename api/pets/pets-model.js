const db = require("../../data/db-config");

const get = () => {
  return db("pets");
};

const getById = (pet_id) => {
  return db("pets").where("pet_id", pet_id).first();
};

const insert = (pet) => {
  return db("pets").insert(pet);
};

const update = (pet_id, pet) => {
  return db("users").where("pet_id", pet_id).update(pet);
};

const remove = (pet_id) => {
  return db("pets").where("pet_id", pet_id).del();
};

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};
