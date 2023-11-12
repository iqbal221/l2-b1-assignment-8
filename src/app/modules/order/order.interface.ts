import { Status } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export type IOrderFilters = {
  searchTerm?: string;
};

export type IOrderedBook = {
  orderedBooks?: {
    bookId: string;
    quantity: number;
  }[];
};

// export type IOrderData = {
//   orderedBooks?:
//     | Prisma.OrderCreateorderedBooksInput
//     | Prisma.InputJsonValue[]
//     | undefined;
//   userId: string;
// };

export type IOrderData = {
  id: string;
  orderedBooks?: JsonValue[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
