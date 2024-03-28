import { Router } from 'express';
import { CitiesController } from '../controllers/cities';
import { PeopleController } from '../controllers';

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

router.post(
  '/create-person',
  PeopleController.createValidation,
  PeopleController.create,
);

router.get(
  '/people',
  PeopleController.getAllValidation,
  PeopleController.getAll,
);

router.get(
  'person/:id',
  PeopleController.getByIdValidation,
  PeopleController.getById,
);

router.delete(
  '/person-delete/:id',
  PeopleController.deteleByIdValidation,
  PeopleController.deleteById,
);

export { router };
