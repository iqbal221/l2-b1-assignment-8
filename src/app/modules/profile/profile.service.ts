import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../../shared/prisma';

const GetUserProfile = async (
  UserData: JwtPayload | null
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      email: UserData?.userEmail,
    },
  });
  console.log(result);
  return result;
};

export const UserProfileService = {
  GetUserProfile,
};
