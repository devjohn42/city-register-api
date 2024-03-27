import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.person).where('id', '=', id).del();

    if (result > 0) return;

    return new Error('Error when deleting the registry');
  } catch (error) {
    return new Error('Error when deleting the registry');
  }
};
