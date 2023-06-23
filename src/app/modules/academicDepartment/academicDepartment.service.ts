import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { paginationHelper } from '../../../helpers/PaginationHelper';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null | undefined> => {
  const result = (await AcademicDepartment.findById(id))?.populate(
    'academicFaculty'
  );
  return result;
};

const getAllAcademicDepartment = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andCondition?.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAcademicDepartment = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | undefined | null> => {
  const result = (
    await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
  )?.populate('academicFaculty');
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null | undefined> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getSingleDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
  deleteDepartment,
};
