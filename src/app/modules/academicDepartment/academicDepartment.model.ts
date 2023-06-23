import { Schema, model } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.interface';

//  Create a Schema corresponding to the document interface.
const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 3. Create a Model.
export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicSemesterModel
>('AcademicDepartment', academicDepartmentSchema);
