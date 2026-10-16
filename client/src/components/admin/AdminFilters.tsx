'use client';

import React from 'react';
import { Search, Filter, RefreshCw, Users, FileSpreadsheet } from 'lucide-react';
import { BloodType } from '../../types';
import { BLOOD_TYPES, AN_NAJAH_FACULTIES, PALESTINIAN_CITIES, BLOOD_COMPATIBILITY } from '../../services/constants';

interface FiltersProps {
  selectedBloodType: string;
  setSelectedBloodType: (val: string) => void;
  matchCompatible: boolean;
  setMatchCompatible: (val: boolean) => void;
  selectedFaculty: string;
  setSelectedFaculty: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onRefresh: () => void;
  onExport: () => void;
  totalDonorsCount: number;
}

export const AdminFilters: React.FC<FiltersProps> = ({
  selectedBloodType,
  setSelectedBloodType,
  matchCompatible,
  setMatchCompatible,
  selectedFaculty,
  setSelectedFaculty,
  selectedCity,
  setSelectedCity,
  selectedStatus,
  setSelectedStatus,
  searchTerm,
  setSearchTerm,
  onRefresh,
  onExport,
  totalDonorsCount
}) => {
  const compatibleTypes = selectedBloodType && BLOOD_COMPATIBILITY[selectedBloodType as BloodType]
    ? BLOOD_COMPATIBILITY[selectedBloodType as BloodType]
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
      
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center font-bold">
            <Users className="w-5 h-5 text-[#00A3E0]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">سجل المتبرعين (الأقدم في الأعلى)</h3>
            <p className="text-xs text-slate-500">
              إجمالي النتائج الحالية: <span className="font-bold text-[#D90429]">{totalDonorsCount}</span> متبرع
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
            title="تحديث القائمة"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>تحديث</span>
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-white" />
            <span>تصدير Excel</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث بالاسم، الرقم الجامعي، رقم الهاتف، أو البريد الإلكتروني..."
          className="w-full pr-10 pl-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-slate-50/50"
        />
      </div>

      {/* Blood Type Compatibility Selector */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <span>تحديد فصيلة دم المريض / الحالة:</span>
            {selectedBloodType && (
              <span className="bg-[#D90429] text-white px-2 py-0.5 rounded text-[11px]">
                المريض بحاجة إلى: {selectedBloodType}
              </span>
            )}
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <input
              type="checkbox"
              checked={matchCompatible}
              onChange={(e) => setMatchCompatible(e.target.checked)}
              className="w-4 h-4 text-[#002B49] rounded border-slate-300 focus:ring-[#00A3E0]"
            />
            <span>إظهار جميع الفصائل المتوافقة طبياً التي يمكنها التبرع للمريض</span>
          </label>
        </div>

        {/* Buttons for blood types */}
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
          <button
            type="button"
            onClick={() => setSelectedBloodType('')}
            className={`py-2 px-1 text-xs font-bold rounded-lg transition-all border ${
              selectedBloodType === ''
                ? 'bg-[#002B49] text-white border-[#002B49]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            الكل
          </button>
          {BLOOD_TYPES.map((type) => {
            const isSelected = selectedBloodType === type;
            return (
              <button
                type="button"
                key={type}
                onClick={() => setSelectedBloodType(type)}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-all border ${
                  isSelected
                    ? 'bg-[#D90429] text-white border-[#D90429] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00A3E0]'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Compatibility info banner */}
        {selectedBloodType && matchCompatible && (
          <div className="mt-3 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-[#002B49]">الفصائل المتوافقة المقبولة للتبرع:</span>
            {compatibleTypes.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Secondary dropdown filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Faculty */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">الكلية</label>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00A3E0]"
          >
            <option value="all">جميع الكليات</option>
            {AN_NAJAH_FACULTIES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">مكان السكن / المدينة</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00A3E0]"
          >
            <option value="all">جميع المدن</option>
            {PALESTINIAN_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">حالة التوفر</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00A3E0]"
          >
            <option value="all">جميع الحالات</option>
            <option value="available">متاح للتبرع</option>
            <option value="donated_recently">تبرع مؤخراً</option>
            <option value="unavailable">غير متاح حالياً</option>
          </select>
        </div>
      </div>

    </div>
  );
};
