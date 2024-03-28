import * as create from './create';
import * as deleteById from './deleteById';
import * as getAll from './getAll';
import * as getById from './getById';
import * as count from './count';

export const PeopleProvider = {
  ...create,
  ...deleteById,
  ...getAll,
  ...getById,
  ...count,
};
