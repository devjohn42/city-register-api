import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const getById = async (id: number): Promise<IPerson | Error> => {
  try {
    const result = await Knex(TableNames.person)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Person not found');
  } catch (error) {
    console.log(error);
    return new Error('Error when querying the registry');
  }
};
