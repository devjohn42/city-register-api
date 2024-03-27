import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const create = async (
  person: Omit<IPerson, 'id'>,
): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where('id', '=', person.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('The city used in the registration was not found');
    }

    const [result] = await Knex(TableNames.person)
      .insert(person)
      .returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error registering registration');
  } catch (error) {
    return new Error('Error registering registration');
  }
};
