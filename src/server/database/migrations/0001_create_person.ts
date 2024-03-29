import { Knex } from 'knex';
import { TableNames } from '../enums/eTablesNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.person, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('name').index().notNullable();
      table.string('email').unique().notNullable();
      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(TableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Table used to storege people');
    })
    .then(() => {
      console.log(`#Create table ${TableNames.person}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.person).then(() => {
    console.log(`# Create table ${TableNames.person}`);
  });
}
