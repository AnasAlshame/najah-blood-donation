import React from 'react';
import { Search, Filter, RefreshCw, Users, FileSpreadsheet } from 'lucide-react';
import { BloodType } from '../../types';
import { BLOOD_TYPES, AN_NAJAH_FACULTIES, PALESTINIAN_CITIES, BLOOD_COMPATIBILITY } from '../../services/constants';
import { CustomSelect } from '../common/CustomSelect';

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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center font-bold border border-blue-100">
            <Users className="w-6 h-6 text-[#00A3E0]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#002B49]">سجل المتبرعين (الأقدم في الأعلى)</h3>
            <p className="text-sm font-bold text-slate-700 mt-0.5">
              إجمالي النتائج الحالية: <span className="font-black text-[#D90429] text-base">{totalDonorsCount}</span> متبرع
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-black text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200 cursor-pointer"
            title="تحديث القائمة"
          >
            <RefreshCw className="w-4 h-4 text-slate-700" />
            <span>تحديث</span>
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-white" />
            <span>تصدير Excel</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute right-4 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث بالاسم، الرقم الجامعي، رقم الهاتف، أو البريد الإلكتروني..."
          className="w-full pr-12 pl-4 py-3 text-sm sm:text-base font-bold text-slate-900 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 bg-slate-50/60 placeholder:text-slate-500 placeholder:font-normal"
        />
      </div>

      {/* Blood Type Compatibility Selector */}
      <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
          <label className="text-sm sm:text-base font-black text-[#002B49] flex items-center gap-2">
            <span>تحديد فصيلة دم المريض / الحالة:</span>
            {selectedBloodType && (
              <span className="bg-[#D90429] text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-black shadow-xs flex items-center gap-1">
                <span>المريض بحاجة إلى:</span>
                <span dir="ltr" className="font-black tracking-wide">{selectedBloodType}</span>
              </span>
            )}
          </label>

          <label className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800 cursor-pointer select-none bg-white px-3.5 py-2 rounded-xl border-2 border-slate-200 shadow-2xs hover:border-[#00A3E0] transition-colors">
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
        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2.5">
          <button
            type="button"
            onClick={() => setSelectedBloodType('')}
            className={`py-3 px-2 text-sm sm:text-base font-black rounded-xl transition-all border-2 cursor-pointer ${
              selectedBloodType === ''
                ? 'bg-[#002B49] text-white border-[#002B49] shadow-md'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
                dir="ltr"
                className={`py-3 px-2 text-base sm:text-lg font-black rounded-xl transition-all border-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#D90429] text-white border-[#D90429] shadow-md shadow-red-500/30 ring-2 ring-red-200'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-[#00A3E0] hover:bg-cyan-50/50'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Compatibility info banner */}
        {selectedBloodType && matchCompatible && (
          <div className="mt-4 text-xs sm:text-sm font-bold text-slate-800 bg-white p-3.5 rounded-xl border-2 border-slate-200 flex flex-wrap items-center gap-2">
            <span className="font-black text-[#002B49]">الفصائل المتوافقة المقبولة للتبرع:</span>
            {compatibleTypes.map((t) => (
              <span key={t} dir="ltr" className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 font-black text-sm">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Secondary dropdown filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Faculty */}
        <CustomSelect
          label="الكلية"
          value={selectedFaculty}
          options={[
            { value: 'all', label: 'جميع الكليات' },
            ...AN_NAJAH_FACULTIES.map((f) => ({ value: f, label: f }))
          ]}
          onChange={setSelectedFaculty}
        />

        {/* City */}
        <CustomSelect
          label="مكان السكن / المدينة"
          value={selectedCity}
          options={[
            { value: 'all', label: 'جميع المدن' },
            ...PALESTINIAN_CITIES.map((c) => ({ value: c, label: c }))
          ]}
          onChange={setSelectedCity}
        />

        {/* Status */}
        <CustomSelect
          label="حالة التوفر"
          value={selectedStatus}
          options={[
            { value: 'all', label: 'جميع الحالات' },
            { value: 'available', label: 'متاح للتبرع' },
            { value: 'donated_recently', label: 'تبرع مؤخراً' },
            { value: 'unavailable', label: 'غير متاح حالياً' }
          ]}
          onChange={setSelectedStatus}
        />
      </div>

    </div>
  );
};
