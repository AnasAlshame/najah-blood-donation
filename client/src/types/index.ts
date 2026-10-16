export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface IDonor {
  _id: string;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  faculty: string;
  city: string;
  age?: number;
  lastDonationDate?: string;
  status: 'available' | 'donated_recently' | 'unavailable';
  healthCheckPassed?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DonorRegistrationInput {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  faculty: string;
  city: string;
  age?: number;
  lastDonationDate?: string;
  healthCheckPassed?: boolean;
  notes?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    admin: AdminUser;
  };
}

export interface MetaData {
  bloodTypes: BloodType[];
  compatibilityMatrix: Record<BloodType, BloodType[]>;
  faculties: string[];
  cities: string[];
}
