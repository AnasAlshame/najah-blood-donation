import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Check if MongoDB is connected
export const isMongoConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export const connectDB = async (): Promise<boolean> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/najah_blood_db';
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log(`[Database] Connected to live MongoDB: ${mongoUri.split('@').pop()}`);
    return true;
  } catch (error) {
    console.log(`[Database] MongoDB service not running locally at ${mongoUri}. Falling back seamlessly to local persistent JSON file storage!`);
    return false;
  }
};
