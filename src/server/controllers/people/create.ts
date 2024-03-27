import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IPerson } from '../../database/models';
import { PeopleProvider } from '../../database/providers/people';

interface IBodyProps extends Omit<IPerson, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      cityId: yup.number().integer().required().min(1),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, IPerson>, res: Response) => {
  console.log(req.body);

  const result = await PeopleProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
