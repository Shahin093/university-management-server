import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created Successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  // console.log(faculty);
  const result = await UserService.createFaculty(faculty, userData);
  // console.log('result : ', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created Successfully',
    data: result,
  });
});
export const UserController = {
  createStudent,
  createFaculty,
};
