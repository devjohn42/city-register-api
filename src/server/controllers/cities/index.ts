import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';

export const CitiesController = {
  ...create,
  ...getAll,
  ...getById,
};
