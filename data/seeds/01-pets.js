/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pets").del();

  // Inserts seed entries
  await knex("pets").insert([
    { pet_name: "fido", pet_age: 5 },
    { pet_name: "ralph", pet_age: 7 },
    { pet_name: "snickers", pet_age: 1 },
  ]);
};
