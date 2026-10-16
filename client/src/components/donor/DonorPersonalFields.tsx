import React from 'react';
import { User, GraduationCap, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { DonorRegistrationInput } from '../../types';
import { AN_NAJAH_FACULTIES, PALESTINIAN_CITIES } from '../../services/constants';

interface PersonalFieldsProps {
  formData: DonorRegistrationInput;
  setFormData: React.Dispatch<React.SetStateAction<DonorRegistrationInput>>;
}

export const DonorPersonalFields: React.FC<PersonalFieldsProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          الاسم الرباعي <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="مثال: أحمد محمد علي حمد"
            className="w-full pr-10 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20"
          />
        </div>
      </div>

      {/* Student ID */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          الرقم الجامعي <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <GraduationCap className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="text"
            required
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            placeholder="مثال: 12145890"
            className="w-full pr-10 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          البريد الإلكتروني <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="s12145890@stu.najah.edu"
            className="w-full pr-10 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 text-left dir-ltr"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          رقم الهاتف / الواتساب <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="059xxxxxxx أو 056xxxxxxx"
            className="w-full pr-10 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 text-left dir-ltr"
          />
        </div>
      </div>

      {/* Faculty */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          الكلية <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.faculty}
          onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] bg-white"
        >
          {AN_NAJAH_FACULTIES.map((fac) => (
            <option key={fac} value={fac}>{fac}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          مكان السكن / المدينة <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full pr-10 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] bg-white"
          >
            {PALESTINIAN_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Last Donation Date */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          تاريخ آخر تبرع بالدم (إن وجد)
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          <input
            type="date"
            value={formData.lastDonationDate}
            onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
            className="w-full pr-10 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] bg-white"
          />
        </div>
      </div>

      {/* Health Check */}
      <div className="flex items-center gap-3 pt-6">
        <input
          type="checkbox"
          id="healthCheck"
          checked={formData.healthCheckPassed}
          onChange={(e) => setFormData({ ...formData, healthCheckPassed: e.target.checked })}
          className="w-5 h-5 text-[#002B49] rounded border-slate-300 focus:ring-[#00A3E0]"
        />
        <label htmlFor="healthCheck" className="text-xs text-slate-700 cursor-pointer select-none">
          أؤكد أنني بصحة جيدة ووزني فوق 50 كغم ولا أعاني من موانع طبية للتبرع.
        </label>
      </div>
    </div>
  );
};
