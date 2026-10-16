import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    username: string;
    role: string;
  };
}

export const protectAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'غير مصرح لك بالدخول، يرجى تسجيل الدخول أولاً' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';

    const decoded = jwt.verify(token, secret) as { id: string; username: string; role: string };
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'جلسة الدخول منتهية أو غير صالحة' });
    return;
  }
};
