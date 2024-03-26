import * as create from './create';
import * as deleteById from './deleteById';
import * as updateById from './updateById';
import * as getAll from './getAll';
import * as count from './count';

export const CitiesProvider = {
  ...create,
  ...deleteById,
  ...getAll,
  ...updateById,
  ...count,
};
