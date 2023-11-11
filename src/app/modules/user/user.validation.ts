import { z } from 'zod';

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  update,
};
