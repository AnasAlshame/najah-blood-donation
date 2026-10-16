import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin, IAdmin } from '../models/Admin.js';
import { isMongoConnected } from '../config/db.js';
import { JsonStore } from '../utils/jsonStore.js';

const ADMIN_REGISTRATION_PASSCODE = process.env.ADMIN_REGISTRATION_PASSCODE || 'NAJAH_ADMIN_2026';
const adminStore = new JsonStore<any>('admins');

export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, fullName, email, password, passcode } = req.body;

    if (!username || !fullName || !email || !password || !passcode) {
      res.status(400).json({ success: false, message: 'يرجى ملء جميع الحقول المطلوبة' });
      return;
    }

    if (passcode !== ADMIN_REGISTRATION_PASSCODE) {
      res.status(403).json({ success: false, message: 'رمز تفويض الإدارة غير صحيح' });
      return;
    }

    const lowerEmail = email.toLowerCase().trim();
    const lowerUser = username.toLowerCase().trim();

    if (isMongoConnected()) {
      const existing = await Admin.findOne({ $or: [{ email: lowerEmail }, { username: lowerUser }] });
      if (existing) {
        res.status(400).json({ success: false, message: 'اسم المستخدم أو البريد مسجل مسبقاً' });
        return;
      }
      const admin = new Admin({ username: lowerUser, fullName, email: lowerEmail, password, role: 'admin' });
      await admin.save();
      const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';
      const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, secret, { expiresIn: '7d' });
      res.status(201).json({ success: true, message: 'تم تسجيل حساب المشرف بنجاح', data: { token, admin: { id: admin._id, username: admin.username, fullName: admin.fullName, email: admin.email, role: admin.role } } });
      return;
    }

    // Fallback store
    const existing = await adminStore.findOne((a) => a.email === lowerEmail || a.username === lowerUser);
    if (existing) {
      res.status(400).json({ success: false, message: 'اسم المستخدم أو البريد مسجل مسبقاً' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = await adminStore.create({
      username: lowerUser,
      fullName,
      email: lowerEmail,
      password: hashedPassword,
      role: 'admin'
    });

    const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';
    const token = jwt.sign({ id: newAdmin._id, username: newAdmin.username, role: newAdmin.role }, secret, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      message: 'تم تسجيل حساب المشرف بنجاح',
      data: { token, admin: { id: newAdmin._id, username: newAdmin.username, fullName: newAdmin.fullName, email: newAdmin.email, role: newAdmin.role } }
    });
  } catch (error: any) {
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

    if (isMongoConnected()) {
      const admin = await Admin.findOne({ $or: [{ email: query }, { username: query }] });
      if (!admin || !(await admin.comparePassword(password))) {
        res.status(401).json({ success: false, message: 'بيانات تسجيل الدخول غير صحيحة' });
        return;
      }
      const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';
      const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, secret, { expiresIn: '7d' });
      res.status(200).json({ success: true, message: 'تم تسجيل الدخول بنجاح', data: { token, admin: { id: admin._id, username: admin.username, fullName: admin.fullName, email: admin.email, role: admin.role } } });
      return;
    }

    // Fallback store
    const admin = await adminStore.findOne((a) => a.email === query || a.username === query);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      res.status(401).json({ success: false, message: 'بيانات تسجيل الدخول غير صحيحة' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'najah_blood_secret_key_2026';
    const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, secret, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: { token, admin: { id: admin._id, username: admin.username, fullName: admin.fullName, email: admin.email, role: admin.role } }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء تسجيل الدخول', error: error.message });
  }
};
