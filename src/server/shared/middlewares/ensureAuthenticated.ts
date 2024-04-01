import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Unauthenticated' },
    });
  }

  console.log(authorization);
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Unauthenticated' },
    });
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Error verifying token',
      },
    });
  } else if (jwtData === 'INVALID_TOKEN') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Unauthenticated' },
    });
  }

  console.log(jwtData);
  console.log(req.headers);
  req.headers.idUser = jwtData.uid.toString();
  console.log(req.headers.idUser);
  return next();
};
