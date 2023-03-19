/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.string('fname').notNullable();
        table.string('lname').notNullable();
        table.string('profile_picture');
        table.string('email').unique();
        table.string('password');
        table.string("address");
        table.boolean("isDeleted").defaultTo("false");
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('student');
};
