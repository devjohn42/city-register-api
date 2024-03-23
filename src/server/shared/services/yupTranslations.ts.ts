import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'This field is required',
    notType: 'Invalid format entered',
    defined: 'This field must have a defined value',
    oneOf: 'Must be one of the following values: ${values}',
    notOneOf: 'Cannot be one of the following values: ${values}',
  },
  string: {
    lowercase: 'Must be in lowercase',
    uppercase: 'Must be in uppercase',
    url: 'Must have a valid URL format',
    max: 'Must have at most ${max} characters',
    min: 'Must have at least ${min} characters',
    email: 'Entered email format is not valid',
    length: 'Must have exactly ${length} characters',
    uuid: 'Entered value does not match a valid UUID',
    trim: 'Must not contain spaces at the beginning or end',
    matches: 'Value must match the pattern: ${regex}',
  },
  number: {
    min: 'Must be at least ${min}',
    max: 'Must be at most ${max}',
    integer: 'Must be an integer',
    lessThan: 'Must be less than ${less}',
    moreThan: 'Must be more than ${more}',
    positive: 'Must be a positive number',
    negative: 'Must be a negative number',
  },
  date: {
    min: 'Must be greater than the date ${min}',
    max: 'Must be less than the date ${max}',
  },
  array: {
    min: 'Must have at least ${min} items',
    max: 'Must have at most ${max} items',
    length: 'Must contain exactly ${length} items',
  },
  object: {
    noUnknown: 'A defined value must be passed',
  },
});