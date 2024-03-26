import * as create from './create';
import * as deleteById from './deleteById';
import * as updateById from './updateById';

export const CitiesProvider = {
  ...create,
  ...deleteById,
  ...updateById,
};
