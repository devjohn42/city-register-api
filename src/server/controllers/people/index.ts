import * as create from './create';
import * as getAll from './getAll';
import * as deleteById from './deleteById';

export const PeopleController = {
  ...create,
  ...deleteById,
  ...getAll,
};
