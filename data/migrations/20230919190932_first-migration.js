/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("pets", (tbl) => {
    tbl.increments("pet_id");
    tbl.string("pet_name").notNullable();
    tbl.integer("pet_age").notNullable().unsigned();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("pets");
};
