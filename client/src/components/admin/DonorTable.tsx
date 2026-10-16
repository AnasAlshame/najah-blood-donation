'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Phone, MessageCircle, Mail, Calendar, Trash2, CheckCircle2, Clock, XCircle, ChevronDown, Check } from 'lucide-react';
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

const STATUS_OPTIONS = [
  { value: 'available', label: 'متاح للتبرع', color: 'emerald' },
  { value: 'donated_recently', label: 'تبرع مؤخراً', color: 'amber' },
  { value: 'unavailable', label: 'غير متاح', color: 'rose' }
];

const DonorStatusSelect: React.FC<{
  status: string;
  onChange: (newStatus: string) => void;
}> = ({ status, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];

  const getBadgeStyle = (val: string) => {
    switch (val) {
      case 'available':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-500';
      case 'donated_recently':
        return 'bg-amber-50 text-amber-800 border-amber-300 hover:border-amber-500';
      case 'unavailable':
      default:
        return 'bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-500';
    }
  };

  const getIcon = (val: string) => {
    switch (val) {
      case 'available':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'donated_recently':
        return <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'unavailable':
      default:
        return <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
    }
  };

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${getBadgeStyle(
          status
        )} ${isOpen ? 'ring-2 ring-[#00A3E0]/30 border-[#00A3E0]' : ''}`}
      >
        <div className="flex items-center gap-1.5">
          {getIcon(status)}
          <span>{currentOption.label}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-500 ${
            isOpen ? 'rotate-180 text-[#00A3E0]' : ''
          }`}
        />
      </button>

      {/* Smooth Downward Menu */}
      {isOpen && (
        <div className="absolute z-50 top-full mt-1.5 right-0 min-w-[140px] bg-white rounded-xl border-2 border-slate-200 shadow-2xl py-1 animate-in fade-in-50 zoom-in-95 duration-150">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = opt.value === status;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors text-right cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50 text-[#002B49]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#00A3E0]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {getIcon(opt.value)}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
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
              <th className="py-3.5 px-4 font-bold">
                <div>معلومات الاتصال</div>
                <div className="text-[11px] text-cyan-200 font-semibold mt-0.5">(الهاتف والإيميل)</div>
              </th>
              <th className="py-3.5 px-4 font-bold">الكلية والسكن</th>
              <th className="py-3.5 px-4 font-bold">
                <div>تاريخ التسجيل</div>
                <div className="text-[11px] text-cyan-200 font-semibold mt-0.5">(الأقدم بالأعلى)</div>
              </th>
              <th className="py-3.5 px-4 font-bold text-center">الحالة</th>
              <th className="py-3.5 px-4 font-bold text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donors.map((donor, index) => {
              return (
                <tr key={donor._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-xs font-bold">
                    {index + 1}
                  </td>

                  {/* Donor Info */}
                  <td className="py-3.5 px-4">
                    <div className="font-black text-slate-900 text-sm sm:text-base">{donor.fullName}</div>
                    <div className="text-xs text-slate-700 font-bold font-mono mt-0.5">الرقم: {donor.studentId}</div>
                  </td>

                  {/* Blood Type Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span dir="ltr" className="inline-block px-3 py-1.5 rounded-xl bg-[#D90429] text-white font-black text-sm shadow-sm shadow-red-500/20">
                      {donor.bloodType}
                    </span>
                  </td>

                  {/* Contact Info: Email & Phone with Prefix as entered */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1.5">
                      {/* Phone with prefix */}
                      <a
                        href={`tel:${donor.phone}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#002B49] hover:text-[#00A3E0] transition-colors"
                        title="اتصال بالمتبرع"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                        <span dir="ltr" className="font-mono tracking-wide">{donor.phone}</span>
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:${donor.email}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#00A3E0] transition-colors"
                        title="إرسال بريد إلكتروني"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span dir="ltr" className="font-mono truncate max-w-[200px]">{donor.email}</span>
                      </a>
                    </div>
                  </td>

                  {/* Faculty & City */}
                  <td className="py-3.5 px-4">
                    <div className="text-xs sm:text-sm font-black text-slate-900">{donor.faculty}</div>
                    <div className="text-xs text-slate-700 font-bold mt-0.5">📍 {donor.city}</div>
                  </td>

                  {/* Registered Date & Last Donation */}
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-800">
                    <div>
                      {new Date(donor.createdAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    {donor.lastDonationDate && (
                      <div className="text-[11px] text-amber-800 font-black mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>آخر تبرع: {new Date(donor.lastDonationDate).toLocaleDateString('ar-EG')}</span>
                      </div>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4 text-center">
                    <DonorStatusSelect
                      status={donor.status}
                      onChange={(newStatus) => onStatusChange(donor._id, newStatus)}
                    />
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
