import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.InsertIntoDB
);
router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.UpdateIntoDB
);
router.get('/:id/category', BookController.GetBooksByCategory);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.DeleteFromDB);
router.get('/:id', BookController.GetDataById);
router.get('/', BookController.GetAllFromDB);

export const BookRoutes = router;
