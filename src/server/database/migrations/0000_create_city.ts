import type { Knex } from 'knex';
import { TableNames } from '../enums/eTablesNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.city, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();

      table.comment('table used to store cities in the system');
    })
    .then(() => {
      console.log(`# Create table ${TableNames.city}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.city).then(() => {
    console.log(`# Create table ${TableNames.city}`);
  });
}
