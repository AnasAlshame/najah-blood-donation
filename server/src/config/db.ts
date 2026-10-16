import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/najah_blood_db';
    await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB connected successfully to: ${mongoUri.split('@').pop()}`);
  } catch (error) {
    console.error('[Database] MongoDB connection error:', error);
    // Don't kill process immediately in dev so app can still serve friendly offline error
  }
};
