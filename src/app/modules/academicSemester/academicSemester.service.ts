import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from './academicSemester.Model';
import { academicSemesterTitleCodeMapper } from './academicSemester.constrain';
import { IAcademicSemester } from './academicSemester.interface';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester Code.');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
};
