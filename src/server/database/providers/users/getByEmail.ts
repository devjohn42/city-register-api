import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(TableNames.user)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Register not found');
  } catch (error) {
    console.log(error);
    return new Error('Error when querying the registry');
  }
};
