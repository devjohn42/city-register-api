import { Router } from 'express';
//import { StatusCodes } from 'http-status-codes';
import { CitiesController } from '../controllers/cities';

const router = Router();

router.get('/', (_, res) => {
  return res.send('server running');
});

router.post('/create-city', CitiesController.createBodyValidator, CitiesController.create);

export { router };