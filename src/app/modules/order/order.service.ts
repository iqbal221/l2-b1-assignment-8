import { Order, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { OrderSearchableFields } from './order.constant';
import { IOrderFilters } from './order.interface';

const InsertIntoDB = async (
  OrderData: Order,
  UserData: JwtPayload | null
): Promise<Partial<Order>> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: UserData?.userEmail,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
  }

  OrderData.userId = isUserExist?.id;

  const result = await prisma.order.create({
    include: {
      user: true,
    },
    data: OrderData,
  });

  return result;
};

const GetAllFromDB = async (
  filters: IOrderFilters,
  options: IPaginationOptions,
  UserData: JwtPayload | null
): Promise<IGenericResponse<Order[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email: UserData?.userEmail,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only show access admin');
  }

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: OrderSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    include: {
      user: true,
    },
    where: whereCondition,
    take: limit,
    skip,

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.order.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (
  orderId: string,
  UserData: JwtPayload | null
): Promise<Order | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: UserData?.userEmail,
    },
  });

  const getSingleOrder = await prisma.order.findUnique({
    include: {
      user: true,
    },
    where: {
      userId: isUserExist?.id,
      id: orderId,
    },
  });
  return getSingleOrder;
};

const GetAllOrdersByCustomer = async (
  UserData: JwtPayload | null
): Promise<Order[]> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: UserData?.userEmail,
      role: UserData?.role,
    },
  });

  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User has no order');
  }

  const getAllOrders = await prisma.order.findMany({
    include: {
      user: true,
    },
    where: {
      userId: isUserExist?.id,
    },
  });
  return getAllOrders;
};

export const OrderService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  GetAllOrdersByCustomer,
};
