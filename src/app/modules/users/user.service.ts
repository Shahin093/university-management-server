import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.Model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generatedStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

// const createStudent = async (
//   student: IStudent,
//   user: IUser
// ): Promise<IUser | null> => {
//   // auto generated incremental ID
//   // const id = await generateFacultyId();
//   // // console.log(user)
//   // user.id = id;
//   // default password
//   if (!user?.password) {
//     user.password = config.default_student_pass as string;
//   }

//   // set role
//   user.role = 'student';

//   const academicSemester = await AcademicSemester.findById(
//     student.academicSemester
//   );

//   // new user data
//   let newUserAllData = null;

//   // session start
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     // Generate student ID
//     const id = await generatedStudentId(academicSemester);
//     user.id = id;
//     student.id = id;

//     const newStudent = await Student.create([student], { session });

//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student.');
//     }

//     // set student --->  _id into user.
//     user.student = newStudent[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user.');
//     }

//     newUserAllData = newUser[0];

//     // commit Transaction
//     await session.commitTransaction();

//     // end session
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();

//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemester',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }
//   return newUserAllData;
// };

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate student id
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generatedStudentId(academicsemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'faculty';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate faculty id
    const id = await generateFacultyId();
    // set custom id into both  faculty & user
    user.id = id;
    faculty.id = id;
    // Create faculty using sesssin
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }
    // set faculty _id (reference) into user.student
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
};
