import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const getById = async (id: number): Promise<ICity | Error> => {
  try {
    const result = await Knex(TableNames.city)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('City not found');
  } catch (error) {
    console.log(error);
    return new Error('Error when consulting the city registry');
  }
};
