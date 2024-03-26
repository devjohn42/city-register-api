import { TableNames } from '../../enums/eTablesNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const updateById = async (
  id: number,
  city: Omit<ICity, 'id'>,
): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.city)
      .update(city)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Error updating city registration');
  } catch (error) {
    console.log(error);
    return new Error('Error updating city registration');
  }
};
