import { Knex } from 'knex';
import { TableNames } from '../enums/eTablesNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.user, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('name').notNullable().checkLength('>', 3);
      table.string('email').unique().notNullable().checkLength('>', 6);
      table.string('password').index().notNullable().checkLength('>', 6);

      table.comment('Table used to store system users');
    })
    .then(() => {
      console.log(`✨ Create table ${TableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.user).then(() => {
    console.log(`✨ Create table ${TableNames.user}`);
  });
}
