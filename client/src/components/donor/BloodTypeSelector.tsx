import React from 'react';
import { BloodType } from '../../types';
import { BLOOD_TYPES } from '../../services/constants';

interface BloodTypeSelectorProps {
  selectedType: BloodType;
  onChange: (type: BloodType) => void;
}

export const BloodTypeSelector: React.FC<BloodTypeSelectorProps> = ({
  selectedType,
  onChange
}) => {
  return (
    <div>
      <label className="block text-base font-black text-[#002B49] mb-3">
        فصيلة الدم <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {BLOOD_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <button
              type="button"
              key={type}
              onClick={() => onChange(type)}
              dir="ltr"
              className={`py-3.5 px-2 rounded-2xl text-center font-black text-lg transition-all border-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#D90429] text-white border-[#D90429] shadow-lg shadow-red-500/40 scale-105 ring-2 ring-red-300'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-[#00A3E0] hover:bg-cyan-50/60'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
};
