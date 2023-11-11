import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { BookSearchableFields } from './book.constant';
import { IBookFilters } from './book.interface';

const InsertIntoDB = async (BookData: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: BookData,
    include: {
      category: true,
    },
  });
  return result;
};

const GetAllFromDB = async (
  filters: IBookFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
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

  // person = {name:'zahed'}
  // person[name] = zahed

  const whereCondition: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
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
  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    include: {
      category: true,
    },
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    include: {
      category: true,
    },
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.book.delete({
    include: {
      category: true,
    },
    where: {
      id,
    },
  });
  return result;
};

const GetBooksByCategory = async (
  categoryId: string
): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
  });
  return result;
};

export const BookService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
  GetBooksByCategory,
};
