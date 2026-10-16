import React from 'react';
import { User, GraduationCap, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { DonorRegistrationInput } from '../../types';
import { AN_NAJAH_FACULTIES, PALESTINIAN_CITIES } from '../../services/constants';
import { CustomSelect } from '../common/CustomSelect';
import { CustomDatePicker } from '../common/CustomDatePicker';

interface PersonalFieldsProps {
  formData: DonorRegistrationInput;
  setFormData: React.Dispatch<React.SetStateAction<DonorRegistrationInput>>;
}

export const DonorPersonalFields: React.FC<PersonalFieldsProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-2">
          الاسم الرباعي <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="مثال: أحمد محمد علي حمد"
            className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white"
          />
        </div>
      </div>

      {/* Student ID */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-2">
          الرقم الجامعي <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <GraduationCap className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
          <input
            type="text"
            required
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            placeholder="مثال: 12145890"
            className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-2">
          البريد الإلكتروني <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="s12145890@stu.najah.edu"
            className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white text-left dir-ltr"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-bold text-slate-800 mb-2">
          رقم الهاتف / الواتساب <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+970 / +972 05xxxxxxxx"
            className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white text-left dir-ltr"
          />
        </div>
      </div>

      {/* Faculty */}
      <CustomSelect
        label="الكلية"
        required
        value={formData.faculty}
        options={AN_NAJAH_FACULTIES}
        onChange={(val) => setFormData({ ...formData, faculty: val })}
        icon={<GraduationCap className="w-5 h-5" />}
      />

      {/* City */}
      <CustomSelect
        label="مكان السكن / المدينة"
        required
        value={formData.city}
        options={PALESTINIAN_CITIES}
        onChange={(val) => setFormData({ ...formData, city: val })}
        icon={<MapPin className="w-5 h-5" />}
      />

      {/* Last Donation Date with CustomDatePicker */}
      <CustomDatePicker
        label="تاريخ آخر تبرع بالدم (إن وجد)"
        value={formData.lastDonationDate}
        onChange={(isoDate) => setFormData({ ...formData, lastDonationDate: isoDate })}
        placeholder="dd/mm/yyyy"
      />

      {/* Health Check */}
      <div className="flex items-center gap-3.5 pt-4 sm:pt-6">
        <input
          type="checkbox"
          id="healthCheck"
          checked={formData.healthCheckPassed}
          onChange={(e) => setFormData({ ...formData, healthCheckPassed: e.target.checked })}
          className="w-6 h-6 text-[#002B49] rounded-lg border-2 border-slate-300 focus:ring-[#00A3E0] cursor-pointer shrink-0"
        />
        <label htmlFor="healthCheck" className="text-sm font-bold text-slate-800 cursor-pointer select-none leading-snug">
          أؤكد أنني بصحة جيدة ووزني فوق 50 كغم ولا أعاني من موانع طبية للتبرع.
        </label>
      </div>
    </div>
  );
};
