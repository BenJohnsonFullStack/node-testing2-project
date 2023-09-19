const cleaner = require("knex-cleaner");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await cleaner.clean(knex, {
    mode: "truncate", // resets ids
    ignoreTables: ["knex_migrations", "knex_migrations_lock"], // don't empty migration tables
  });
};
