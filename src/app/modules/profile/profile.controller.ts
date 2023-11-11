import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserProfileService } from './profile.service';

const GetUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserProfileService.GetUserProfile(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile Data fetched successfully',
    data: result,
  });
});

export const UserProfileController = {
  GetUserProfile,
};
