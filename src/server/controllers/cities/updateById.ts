import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers/cities';

interface IParamsProps {
  id?: number;
}
interface IBodyProps extends Omit<ICity, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
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

  const result = await CitiesProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'register not found',
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
