import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';
import { JWTService, passwordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(6).max(30),
      password: yup.string().required().min(6).max(30),
    }),
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  console.log(req.body);

  const { email, password } = req.body;

  const user = await UsersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid email or passwords',
      },
    });
  }

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'User not found',
      },
    });
  }

  const passwordMatch = await passwordCrypto.verifyPassword(
    password,
    user.password,
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid email or passwords',
      },
    });
  } else {
    const accessToken = JWTService.sign({ uid: user.id });

    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Error generating access token',
        },
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
