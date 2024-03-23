import { Router } from 'express';
import { CitiesController } from '../controllers/cities';

const router = Router();

router.get('/', (_, res) => {
  return res.send('server running');
});

router.post(
  '/create-city',
  CitiesController.createValidation,
  CitiesController.create,
);

router.get(
  '/cities',
  CitiesController.getAllValidation,
  CitiesController.getAll,
);

export { router };