/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_profile', (table) => {
        table.increments('id').unsigned().primary();
        table.string('national_id').notNullable();
        table.string("gender").notNullable();
        table.string('date_of_birth').notNullable();
        table.string('profile_picture');
        table.string("address");
        table.integer("user_id").notNullable();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
