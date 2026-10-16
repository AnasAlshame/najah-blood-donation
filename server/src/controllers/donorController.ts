import { Request, Response } from 'express';
import { Donor, IDonor } from '../models/Donor.js';
import { isMongoConnected } from '../config/db.js';
import { JsonStore } from '../utils/jsonStore.js';
import { BloodType, BLOOD_COMPATIBILITY, VALID_BLOOD_TYPES } from '../utils/bloodCompatibility.js';

const donorStore = new JsonStore<any>('donors');

export const registerDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, studentId, email, phone, bloodType, faculty, city, age, lastDonationDate, healthCheckPassed, notes } = req.body;

    if (!fullName || !studentId || !email || !phone || !bloodType || !faculty || !city) {
      res.status(400).json({ success: false, message: 'يرجى تعبئة كافة الحقول الإلزامية' });
      return;
    }

    if (!VALID_BLOOD_TYPES.includes(bloodType as BloodType)) {
      res.status(400).json({ success: false, message: 'فصيلة الدم غير صالحة' });
      return;
    }

    const donorData = {
      fullName: fullName.trim(),
      studentId: studentId.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      bloodType,
      faculty: faculty.trim(),
      city: city.trim(),
      age: age ? Number(age) : undefined,
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : undefined,
      healthCheckPassed: healthCheckPassed ?? true,
      notes: notes?.trim(),
      status: 'available'
    };

    if (isMongoConnected()) {
      const donor = new Donor(donorData);
      await donor.save();
      res.status(201).json({ success: true, message: 'تم تسجيلك كمتبرع بالدم بنجاح!', data: { id: donor._id } });
      return;
    }

    const saved = await donorStore.create(donorData);
    res.status(201).json({ success: true, message: 'تم تسجيلك كمتبرع بالدم بنجاح!', data: { id: saved._id } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'فشل حفظ بيانات المتبرع', error: error.message });
  }
};

export const getDonors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bloodType, matchCompatible, faculty, city, status, search } = req.query;

    if (isMongoConnected()) {
      const filter: any = {};
      if (bloodType && typeof bloodType === 'string') {
        const bType = bloodType.trim() as BloodType;
        filter.bloodType = matchCompatible === 'true' && BLOOD_COMPATIBILITY[bType] ? { $in: BLOOD_COMPATIBILITY[bType] } : bType;
      }
      if (faculty && faculty !== 'all') filter.faculty = faculty;
      if (city && city !== 'all') filter.city = city;
      if (status && status !== 'all') filter.status = status;
      if (search && typeof search === 'string' && search.trim() !== '') {
        const term = search.trim();
        filter.$or = [{ fullName: { $regex: term, $options: 'i' } }, { studentId: { $regex: term, $options: 'i' } }, { phone: { $regex: term, $options: 'i' } }];
      }
      const donors = await Donor.find(filter).sort({ createdAt: 1 });
      res.status(200).json({ success: true, count: donors.length, data: donors });
      return;
    }

    // JSON Store fallback
    let all = await donorStore.find();
    if (bloodType && typeof bloodType === 'string') {
      const bType = bloodType.trim() as BloodType;
      const allowed = matchCompatible === 'true' && BLOOD_COMPATIBILITY[bType] ? BLOOD_COMPATIBILITY[bType] : [bType];
      all = all.filter((d) => allowed.includes(d.bloodType));
    }
    if (faculty && faculty !== 'all') all = all.filter((d) => d.faculty === faculty);
    if (city && city !== 'all') all = all.filter((d) => d.city === city);
    if (status && status !== 'all') all = all.filter((d) => d.status === status);
    if (search && typeof search === 'string' && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      all = all.filter((d) => (d.fullName || '').toLowerCase().includes(term) || (d.studentId || '').includes(term) || (d.phone || '').includes(term));
    }
    all.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    res.status(200).json({ success: true, count: all.length, data: all });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء جلب المتبرعين', error: error.message });
  }
};

export const updateDonorStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const donorId = String(req.params.id);
    const { status, notes } = req.body;
    if (isMongoConnected()) {
      const donor = await Donor.findById(donorId);
      if (!donor) { res.status(404).json({ success: false, message: 'المتبرع غير موجود' }); return; }
      if (status) donor.status = status as any;
      if (notes !== undefined) donor.notes = notes;
      await donor.save();
      res.status(200).json({ success: true, message: 'تم تحديث الحالة بنجاح', data: donor });
      return;
    }

    const updated = await donorStore.findByIdAndUpdate(donorId, { status, notes });
    if (!updated) { res.status(404).json({ success: false, message: 'المتبرع غير موجود' }); return; }
    res.status(200).json({ success: true, message: 'تم تحديث الحالة بنجاح', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء التحديث', error: error.message });
  }
};

export const deleteDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const donorId = String(req.params.id);
    if (isMongoConnected()) {
      const donor = await Donor.findByIdAndDelete(donorId);
      if (!donor) { res.status(404).json({ success: false, message: 'المتبرع غير موجود' }); return; }
      res.status(200).json({ success: true, message: 'تم الحذف بنجاح' });
      return;
    }
    const deleted = await donorStore.findByIdAndDelete(donorId);
    if (!deleted) { res.status(404).json({ success: false, message: 'المتبرع غير موجود' }); return; }
    res.status(200).json({ success: true, message: 'تم الحذف بنجاح' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء الحذف', error: error.message });
  }
};
