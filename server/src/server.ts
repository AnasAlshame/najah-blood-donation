import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import {
  BLOOD_COMPATIBILITY,
  VALID_BLOOD_TYPES,
  AN_NAJAH_FACULTIES,
  PALESTINIAN_CITIES
} from './utils/bloodCompatibility.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Public Meta Info Route (Dropdown lists and Compatibility Matrix for UI)
app.get('/api/meta', (_req: Request, res: Response) => {
  res.json({
    success: true,
    bloodTypes: VALID_BLOOD_TYPES,
    compatibilityMatrix: BLOOD_COMPATIBILITY,
    faculties: AN_NAJAH_FACULTIES,
    cities: PALESTINIAN_CITIES
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', university: 'An-Najah National University', service: 'Blood Donation Platform API' });
});

app.listen(PORT, () => {
  console.log(`[Server] An-Najah Blood Donation Server is running on http://localhost:${PORT}`);
});

export default app;
