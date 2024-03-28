import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const updateById = async (
  id: number,
  person: Omit<IPerson, 'id'>,
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where('id', '=', person.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('Hte city used on registration was not found');
    }

    const result = await Knex(TableNames.person)
      .update(person)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error when update the registry');
  } catch (error) {
    console.log(error);
    return new Error('Error when update the registry');
  }
};
