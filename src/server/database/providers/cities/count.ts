import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where('name', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Error when querying the total number of cities');
  } catch (error) {
    console.log(error);
    return new Error('Error when querying the total number of cities');
  }
};
