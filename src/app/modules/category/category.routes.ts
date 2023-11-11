import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.InsertIntoDB
);
router.patch(
  '/:id',
  validateRequest(CategoryValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.UpdateIntoDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.DeleteFromDB
);
router.get('/:id', CategoryController.GetDataById);
router.get('/', CategoryController.GetAllFromDB);

export const CategoryRoutes = router;
