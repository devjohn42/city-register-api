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

router.get(
  '/city/:id',
  CitiesController.getByIdValidation,
  CitiesController.getById,
);

router.put(
  '/city-update/:id',
  CitiesController.updateByIdValidation,
  CitiesController.updateById,
);

router.delete(
  '/city-delete/:id',
  CitiesController.deteleByIdValidation,
  CitiesController.deleteById,
);

export { router };
