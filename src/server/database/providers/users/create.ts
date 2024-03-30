import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';
import { passwordCrypto } from '../../../shared/services/passwordCrypto';

export const create = async (
  user: Omit<IUser, 'id'>,
): Promise<number | Error> => {
  try {
    const hashedPassword = await passwordCrypto.hashPassword(user.password);
    const [result] = await Knex(TableNames.user)
      .insert({ ...user, password: hashedPassword })
      .returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error registering user');
  } catch (error) {
    console.log(error);
    return new Error('Error registering user');
  }
};
