import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidation.create),
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.InsertIntoDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
  OrderController.GetDataById
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.GetAllFromDB);
router.get(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.GetAllOrdersByCustomer
);

export const OrderRoutes = router;
