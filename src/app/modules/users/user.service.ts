import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.Model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

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
    console.log('New Student : ', newStudent);

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

export const UserService = {
  createStudent,
};
