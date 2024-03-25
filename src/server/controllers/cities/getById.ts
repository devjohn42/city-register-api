import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (Number(req.params.id) === 2) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'register not found',
      },
    });
  }

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: 'Tokyo',
    country: 'Japan',
  });
};
