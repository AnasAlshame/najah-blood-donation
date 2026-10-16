import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const ADMIN_REGISTRATION_PASSCODE = process.env.ADMIN_REGISTRATION_PASSCODE || 'NAJAH_ADMIN_2026';

export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, fullName, email, password, passcode } = req.body;

    if (!username || !fullName || !email || !password || !passcode) {
      res.status(400).json({ success: false, message: 'يرجى ملء جميع الحقول المطلوبة' });
      return;
    }

    // Security check: verification code for admin registration
    if (passcode !== ADMIN_REGISTRATION_PASSCODE) {
      res.status(403).json({ success: false, message: 'رمز تفويض الإدارة غير صحيح' });
      return;
    }

    const existingAdmin = await Admin.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (existingAdmin) {
      res.status(400).json({ success: false, message: 'اسم المستخدم أو البريد الإلكتروني مسجل مسبقاً' });
      return;
    }

    const admin = new Admin({
      username: username.toLowerCase(),
      fullName,
      email: email.toLowerCase(),
      password,
      role: 'admin'
    });

    await admin.save();

    const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      secret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'تم تسجيل حساب المشرف بنجاح',
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          fullName: admin.fullName,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error: any) {
    console.error('Error registering admin:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء تسجيل المشرف', error: error.message });
  }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      res.status(400).json({ success: false, message: 'يرجى إدخال اسم المستخدم/البريد وكلمة المرور' });
      return;
    }

    const query = usernameOrEmail.toLowerCase().trim();
    const admin = await Admin.findOne({
      $or: [{ email: query }, { username: query }]
    });

    if (!admin) {
      res.status(401).json({ success: false, message: 'بيانات تسجيل الدخول غير صحيحة' });
      return;
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'بيانات تسجيل الدخول غير صحيحة' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          fullName: admin.fullName,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error: any) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم أثناء تسجيل الدخول', error: error.message });
  }
};
