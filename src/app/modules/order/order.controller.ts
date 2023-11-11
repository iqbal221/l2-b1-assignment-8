import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderFilterableFields } from './order.constant';
import { OrderService } from './order.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.InsertIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, OrderFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await OrderService.GetAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const GetDataById = async (req: Request, res: Response) => {
  const result = await OrderService.GetDataById(req.params.id, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
};

const GetAllOrdersByCustomer = async (req: Request, res: Response) => {
  const result = await OrderService.GetAllOrdersByCustomer(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
};

export const OrderController = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  GetAllOrdersByCustomer,
};
