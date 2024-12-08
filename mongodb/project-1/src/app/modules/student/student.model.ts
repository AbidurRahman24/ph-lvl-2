import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {
      type: String,
      maxlength: [20,'First Name can not more than 20 character'],
      trim: true, //samner piconer jodi space take tahole remove kore dibe.
      required: [true, 'First name is required and cannot be empty'],
      validate: {
        validator: function(value:string){
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
            return firstNameStr === value
        },
        message:'{VALUE} is not capitalaize format'
      }
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required and cannot be empty'],
      validate: {
        validator: (value: string)=> validator.isAlphanumeric(value),
        message: '{VALUE} IS NOT VALID'
      }
    },
  });
  
  const guardianSchema = new Schema<Guardian>({
    fatherName: {
      type: String,
      required: [true, 'Father\'s name is required'],
    },
    fatherOccupation: {
      type: String,
      required: [true, 'Father\'s occupation is required'],
    },
    fatherContactNo: {
      type: String,
      required: [true, 'Father\'s contact number is required'],
    },
    motherName: {
      type: String,
      required: [true, 'Mother\'s name is required'],
    },
    motherOccupation: {
      type: String,
      required: [true, 'Mother\'s occupation is required'],
    },
    motherContactNo: {
      type: String,
      required: [true, 'Mother\'s contact number is required'],
    },
  });
  
  const localGuardianSchema = new Schema<LocalGuardian>({
    name: {
      type: String,
      required: [true, 'Local guardian\'s name is required'],
    },
    occupation: {
      type: String,
      required: [true, 'Local guardian\'s occupation is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Local guardian\'s contact number is required'],
    },
    address: {
      type: String,
      required: [true, 'Local guardian\'s address is required'],
    },
  });
  
  const studentSchema = new Schema<Student>({
    id: { type: String },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
          values: ['male', 'female', 'other'],
          message: '{VALUE} is not a valid gender. Choose from male, female, or other.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { 
      type: String,
      required: [true, 'Date of birth is required'],
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      validate: {
        validator: (value: string)=> validator.isEmail(value),
        message: '{VALUE} IS NOT VALID'
      }
    },
    contactNo: { 
      type: String, 
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: { 
      type: String, 
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group. Choose a valid option.',
      },
    },
    presentAddress: { 
      type: String, 
      required: [true, 'Present address is required'],
    },
    permanentAddress: { 
      type: String, 
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required'],
    },
    profileImg: { 
      type: String,
    },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  });
  
  export const StudentModel = model<Student>('Student', studentSchema);
  