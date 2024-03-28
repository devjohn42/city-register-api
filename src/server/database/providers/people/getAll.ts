import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(TableNames.person)
      .select('*')
      .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);
    return result;
  } catch (error) {
    console.log(error);
    return new Error(
      'Error when checking the total number of registered people',
    );
  }
};
