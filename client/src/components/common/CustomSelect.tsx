'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  options: (string | SelectOption)[];
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  buttonClassName?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
  icon,
  placeholder,
  required = false,
  buttonClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : value;

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-xs sm:text-sm font-black text-[#002B49] mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={
          buttonClassName ||
          `w-full px-4 py-3 text-sm sm:text-base font-bold rounded-2xl border-2 transition-all flex items-center justify-between text-right cursor-pointer bg-white ${
            isOpen
              ? 'border-[#00A3E0] ring-4 ring-[#00A3E0]/15 shadow-sm'
              : 'border-slate-200 hover:border-[#00A3E0]/70'
          }`
        }
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          <span className={`truncate ${displayLabel ? 'text-slate-900' : 'text-slate-400'}`}>
            {displayLabel || placeholder || 'اختر من القائمة...'}
          </span>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#00A3E0]' : ''
          }`}
        />
      </button>

      {/* Custom Dropdown Menu (Strictly opening downward with smooth fade-in) */}
      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white rounded-2xl border-2 border-slate-200 shadow-2xl overflow-hidden py-1.5 max-h-60 overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150">
          {normalizedOptions.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center justify-between transition-colors text-right cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50 text-[#002B49]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#00A3E0]'
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#00A3E0] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
