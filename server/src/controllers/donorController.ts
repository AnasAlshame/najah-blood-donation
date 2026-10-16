import { Request, Response } from 'express';
import { Donor } from '../models/Donor.js';
import { BloodType, BLOOD_COMPATIBILITY, VALID_BLOOD_TYPES } from '../utils/bloodCompatibility.js';

export const registerDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      studentId,
      email,
      phone,
      bloodType,
      faculty,
      city,
      lastDonationDate,
      healthCheckPassed,
      notes
    } = req.body;

    if (!fullName || !studentId || !email || !phone || !bloodType || !faculty || !city) {
      res.status(400).json({ success: false, message: 'يرجى تعبئة كافة الحقول الإلزامية' });
      return;
    }

    if (!VALID_BLOOD_TYPES.includes(bloodType as BloodType)) {
      res.status(400).json({ success: false, message: 'فصيلة الدم غير صالحة' });
      return;
    }

    const donor = new Donor({
      fullName: fullName.trim(),
      studentId: studentId.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      bloodType,
      faculty: faculty.trim(),
      city: city.trim(),
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : undefined,
      healthCheckPassed: healthCheckPassed ?? true,
      notes: notes?.trim(),
      status: 'available'
    });

    await donor.save();

    res.status(201).json({
      success: true,
      message: 'شكراً لك! تم تسجيلك كمتبرع بالدم بنجاح وحفظ بياناتك بشكل آمن.',
      data: {
        id: donor._id,
        fullName: donor.fullName,
        bloodType: donor.bloodType
      }
    });
  } catch (error: any) {
    console.error('Error registering donor:', error);
    res.status(500).json({ success: false, message: 'فشل حفظ بيانات المتبرع', error: error.message });
  }
};

export const getDonors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bloodType, matchCompatible, faculty, city, status, search } = req.query;

    const filter: any = {};

    if (bloodType && typeof bloodType === 'string') {
      const bType = bloodType.trim() as BloodType;
      if (matchCompatible === 'true' && BLOOD_COMPATIBILITY[bType]) {
        // Find donors whose blood can be given to this blood type
        filter.bloodType = { $in: BLOOD_COMPATIBILITY[bType] };
      } else {
        // Exact blood type match
        filter.bloodType = bType;
      }
    }

    if (faculty && typeof faculty === 'string' && faculty !== 'all') {
      filter.faculty = faculty;
    }

    if (city && typeof city === 'string' && city !== 'all') {
      filter.city = city;
    }

    if (status && typeof status === 'string' && status !== 'all') {
      filter.status = status;
    }

    if (search && typeof search === 'string' && search.trim() !== '') {
      const term = search.trim();
      filter.$or = [
        { fullName: { $regex: term, $options: 'i' } },
        { studentId: { $regex: term, $options: 'i' } },
        { email: { $regex: term, $options: 'i' } },
        { phone: { $regex: term, $options: 'i' } }
      ];
    }

    // Sort: OLDEST FIRST (createdAt: 1) as explicitly requested by user
    const donors = await Donor.find(filter).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: donors.length,
      data: donors
    });
  } catch (error: any) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء جلب بيانات المتبرعين', error: error.message });
  }
};

export const updateDonorStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, lastDonationDate, notes } = req.body;

    const donor = await Donor.findById(id);
    if (!donor) {
      res.status(404).json({ success: false, message: 'المتبرع غير موجود' });
      return;
    }

    if (status) donor.status = status;
    if (lastDonationDate) donor.lastDonationDate = new Date(lastDonationDate);
    if (notes !== undefined) donor.notes = notes;

    await donor.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث بيانات وحالة المتبرع بنجاح',
      data: donor
    });
  } catch (error: any) {
    console.error('Error updating donor:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء التحديث', error: error.message });
  }
};

export const deleteDonor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const donor = await Donor.findByIdAndDelete(id);

    if (!donor) {
      res.status(404).json({ success: false, message: 'المتبرع غير موجود' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'تم حذف المتبرع بنجاح'
    });
  } catch (error: any) {
    console.error('Error deleting donor:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء الحذف', error: error.message });
  }
};
