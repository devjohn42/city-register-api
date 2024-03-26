import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const create = async (
  city: Omit<ICity, 'id'>,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableNames.city).insert(city).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('error when registering the city');
  } catch (error) {
    console.log(error);
    return new Error('error when registering the city');
  }
};
