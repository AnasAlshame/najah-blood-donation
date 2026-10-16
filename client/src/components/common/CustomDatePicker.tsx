'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronRight, ChevronLeft, X } from 'lucide-react';

interface CustomDatePickerProps {
  label: string;
  value?: string; // YYYY-MM-DD
  onChange: (dateStr: string) => void;
  placeholder?: string;
}

const MONTH_NAMES = [
  'يناير (1)', 'فبراير (2)', 'مارس (3)', 'أبريل (4)',
  'مايو (5)', 'يونيو (6)', 'يوليو (7)', 'أغسطس (8)',
  'سبتمبر (9)', 'أكتوبر (10)', 'نوفمبر (11)', 'ديسمبر (12)'
];

const DAYS_HEADER = ['أح', 'إث', 'ثلا', 'أرب', 'خم', 'جم', 'سب'];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'dd/mm/yyyy'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // View date state (initialized safely to avoid prerender time mismatch)
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(9); // 0-indexed (October)
  const [hasMounted, setHasMounted] = useState(false);

  // Format value to dd/mm/yyyy for text display
  const formatToDisplay = (isoStr?: string) => {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`; // dd/mm/yyyy
    }
    return isoStr;
  };

  const [textInput, setTextInput] = useState<string>(formatToDisplay(value));

  useEffect(() => {
    setHasMounted(true);
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        setViewYear(parseInt(parts[0], 10));
        setViewMonth(parseInt(parts[1], 10) - 1);
      }
    } else {
      const now = new Date();
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
    }
  }, [value]);

  useEffect(() => {
    setTextInput(formatToDisplay(value));
  }, [value]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Text input typing & single-digit backspace
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTextInput(raw);

    // If matches dd/mm/yyyy validate and propagate
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = raw.match(regex);
    if (match) {
      const d = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const y = parseInt(match[3], 10);
      if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y >= 1950 && y <= 2030) {
        const iso = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        onChange(iso);
        setViewYear(y);
        setViewMonth(m - 1);
      }
    } else if (raw === '') {
      onChange('');
    }
  };

  const selectDate = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(iso);
    setIsOpen(false);
  };

  // Calendar matrix calculation
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const selectedParts = value ? value.split('-').map(Number) : null;

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-bold text-slate-800 mb-2">
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Single interactive icon on the right side only */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00A3E0] transition-colors p-1 cursor-pointer z-10"
          title="فتح التقويم"
        >
          <Calendar className="w-5 h-5" />
        </button>

        {/* Formatted Date Input with 1-digit deletion */}
        <input
          type="text"
          value={textInput}
          onChange={handleTextChange}
          placeholder={placeholder}
          dir="ltr"
          className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white text-right"
        />

        {value && (
          <button
            type="button"
            onClick={() => { onChange(''); setTextInput(''); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
            title="مسح التاريخ"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Smooth Downward Calendar Modal */}
      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full sm:w-80 bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-4 animate-in fade-in-50 zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="text-sm font-extrabold text-[#002B49]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>

            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Days header */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
            {DAYS_HEADER.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank days before month start */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="py-2" />
            ))}

            {/* Month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                selectedParts &&
                selectedParts[0] === viewYear &&
                selectedParts[1] === viewMonth + 1 &&
                selectedParts[2] === day;

              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => selectDate(day)}
                  className={`py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#002B49] text-white shadow-md'
                      : 'text-slate-700 hover:bg-cyan-50 hover:text-[#00A3E0]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today button */}
          <div className="mt-4 pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                onChange(iso);
                setViewYear(now.getFullYear());
                setViewMonth(now.getMonth());
                setIsOpen(false);
              }}
              className="text-xs font-bold text-[#00A3E0] hover:text-[#007ba8] transition-colors cursor-pointer"
            >
              اختيار تاريخ اليوم
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
