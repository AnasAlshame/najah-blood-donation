import { Schema, model, Document } from 'mongoose';
import { BloodType, VALID_BLOOD_TYPES } from '../utils/bloodCompatibility.js';

export interface IDonor extends Document {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  faculty: string;
  city: string;
  lastDonationDate?: Date;
  status: 'available' | 'donated_recently' | 'unavailable';
  healthCheckPassed: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const donorSchema = new Schema<IDonor>(
  {
    fullName: {
      type: String,
      required: [true, 'الاسم الكامل مطلوب'],
      trim: true
    },
    studentId: {
      type: String,
      required: [true, 'الرقم الجامعي مطلوب'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'البريد الإلكتروني مطلوب'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'رقم الهاتف مطلوب'],
      trim: true
    },
    bloodType: {
      type: String,
      enum: VALID_BLOOD_TYPES,
      required: [true, 'فصيلة الدم مطلوبة']
    },
    faculty: {
      type: String,
      required: [true, 'الكلية مطلوبة'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'المدينة / مكان السكن مطلوب'],
      trim: true
    },
    lastDonationDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['available', 'donated_recently', 'unavailable'],
      default: 'available'
    },
    healthCheckPassed: {
      type: Boolean,
      default: true
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast searching and filtering
donorSchema.index({ bloodType: 1 });
donorSchema.index({ city: 1 });
donorSchema.index({ faculty: 1 });
donorSchema.index({ status: 1 });
donorSchema.index({ createdAt: 1 }); // Required for oldest-first ordering

export const Donor = model<IDonor>('Donor', donorSchema);
