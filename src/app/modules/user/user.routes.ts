import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(UserValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.UpdateIntoDB
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.DeleteFromDB);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.GetDataById);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.GetAllFromDB);
router.get(
  '/',
  // auth(ENUM_USER_ROLE.ADMIN),
  // auth(ENUM_USER_ROLE.CUSTOMER),
  UserController.GetUserProfile
);

export const UserRoutes = router;
