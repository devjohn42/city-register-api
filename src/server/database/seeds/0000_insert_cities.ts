import { Knex } from 'knex';
import { TableNames } from '../enums/eTablesNames';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(TableNames.city).count<[{ count: number }]>(
    '* as count',
  );

  if (!Number.isInteger(count) || Number(count) > 0) return;

  const citiesToInsert = cities.map((cityName) => ({
    name: cityName,
  }));
  await knex(TableNames.city).insert(citiesToInsert);
};

//Insert the cities names

const cities = [
  'Tokyo',
  'Yokohama',
  'Osaka',
  'Nagoya',
  'Sappora',
  'Kobe',
  'Kyoto',
  'Fukuoka',
  'Kawasaki',
  'Saitama',
];
