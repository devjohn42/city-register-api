import { Router } from 'express';
import {
  CitiesController,
  PeopleController,
  UsersController,
} from './../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => {
  return res.send('server running');
});

router.post(
  '/create-city',
  ensureAuthenticated,
  CitiesController.createValidation,
  CitiesController.create,
);

router.get(
  '/cities',
  ensureAuthenticated,
  CitiesController.getAllValidation,
  CitiesController.getAll,
);

router.get(
  '/city/:id',
  ensureAuthenticated,
  CitiesController.getByIdValidation,
  CitiesController.getById,
);

router.put(
  '/city-update/:id',
  ensureAuthenticated,
  CitiesController.updateByIdValidation,
  CitiesController.updateById,
);

router.delete(
  '/city-delete/:id',
  ensureAuthenticated,
  CitiesController.deteleByIdValidation,
  CitiesController.deleteById,
);

router.post(
  '/create-person',
  ensureAuthenticated,
  PeopleController.createValidation,
  PeopleController.create,
);

router.get(
  '/people',
  ensureAuthenticated,
  PeopleController.getAllValidation,
  PeopleController.getAll,
);

router.get(
  '/person/:id',
  ensureAuthenticated,
  PeopleController.getByIdValidation,
  PeopleController.getById,
);

router.put(
  '/person-update/:id',
  ensureAuthenticated,
  PeopleController.updateByIdValidation,
  PeopleController.updateById,
);

router.delete(
  '/person-delete/:id',
  ensureAuthenticated,
  PeopleController.deteleByIdValidation,
  PeopleController.deleteById,
);

router.post(
  '/sign-in',
  UsersController.signInValidation,
  UsersController.signIn,
);

router.post(
  '/sign-up',
  UsersController.signUpValidation,
  UsersController.signUp,
);

export { router };
