import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IPerson } from '../../database/models';
import { PeopleProvider } from '../../database/providers/people';

interface IParamsProps {
  id?: number;
}

interface IBodyProps extends Omit<IPerson, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      cityId: yup.number().integer().required().moreThan(0),
    }),
  ),
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const updateById = async (
  req: Request<IParamsProps, {}, IBodyProps>,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'The id parameter needs to be informed',
      },
    });
  }

  const result = await PeopleProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Register not found',
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
