'use client';

import React from 'react';
import { Phone, MessageCircle, Mail, Calendar, Trash2, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { IDonor } from '../../types';

interface DonorTableProps {
  donors: IDonor[];
  loading: boolean;
  onStatusChange: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export const DonorTable: React.FC<DonorTableProps> = ({
  donors,
  loading,
  onStatusChange,
  onDelete
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-[#00A3E0] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">جاري جلب سجل المتبرعين...</p>
      </div>
    );
  }

  if (donors.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
        <p className="text-base font-bold text-slate-700">لا يوجد متبرعون يطابقون خيارات البحث المحددة</p>
        <p className="text-xs text-slate-400 mt-1">جرب تغيير معايير الفلترة أو مسح حقول البحث.</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>متاح للتبرع</span>
          </span>
        );
      case 'donated_recently':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>تبرع مؤخراً</span>
          </span>
        );
      case 'unavailable':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" />
            <span>غير متاح</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs sm:text-sm">
          <thead className="bg-[#002B49] text-white text-[12px]">
            <tr>
              <th className="py-3.5 px-4 font-bold">#</th>
              <th className="py-3.5 px-4 font-bold">المتبرع</th>
              <th className="py-3.5 px-4 font-bold text-center">فصيلة الدم</th>
              <th className="py-3.5 px-4 font-bold">الكلية والسكن</th>
              <th className="py-3.5 px-4 font-bold">تاريخ التسجيل (الأقدم بالأعلى)</th>
              <th className="py-3.5 px-4 font-bold text-center">الحالة</th>
              <th className="py-3.5 px-4 font-bold text-center">التواصل السريع</th>
              <th className="py-3.5 px-4 font-bold text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donors.map((donor, index) => {
              const formattedPhone = donor.phone.startsWith('0')
                ? '970' + donor.phone.substring(1)
                : donor.phone;

              return (
                <tr key={donor._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                    {index + 1}
                  </td>

                  {/* Donor Info */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 text-sm">{donor.fullName}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">الرقم: {donor.studentId}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{donor.email}</span>
                    </div>
                  </td>

                  {/* Blood Type Badge */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1.5 rounded-xl bg-[#D90429] text-white font-black text-sm shadow-sm shadow-red-500/20">
                      {donor.bloodType}
                    </span>
                  </td>

                  {/* Faculty & City */}
                  <td className="py-3 px-4">
                    <div className="text-xs font-semibold text-slate-700">{donor.faculty}</div>
                    <div className="text-xs text-slate-500 mt-0.5">📍 {donor.city}</div>
                  </td>

                  {/* Registered Date & Last Donation */}
                  <td className="py-3 px-4 text-xs text-slate-600">
                    <div>
                      {new Date(donor.createdAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    {donor.lastDonationDate && (
                      <div className="text-[11px] text-amber-700 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>آخر تبرع: {new Date(donor.lastDonationDate).toLocaleDateString('ar-EG')}</span>
                      </div>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3 px-4 text-center">
                    <div className="mb-1">{getStatusBadge(donor.status)}</div>
                    <select
                      value={donor.status}
                      onChange={(e) => onStatusChange(donor._id, e.target.value)}
                      className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="available">متاح</option>
                      <option value="donated_recently">تبرع مؤخراً</option>
                      <option value="unavailable">غير متاح</option>
                    </select>
                  </td>

                  {/* Direct Contact Buttons */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* WhatsApp Button */}
                      <a
                        href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent('السلام عليكم زميلنا في جامعة النجاح الوطنية، بخصوص طلب متبرع دم طارئ...')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                        title="مراسلة عبر واتساب"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      {/* Phone Call Button */}
                      <a
                        href={`tel:${donor.phone}`}
                        className="w-8 h-8 rounded-lg bg-[#002B49] hover:bg-[#0B3A60] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                        title="اتصال هاتفي"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onDelete(donor._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف المتبرع من السجل"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
