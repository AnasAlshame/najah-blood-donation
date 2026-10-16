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
      <label className="block text-sm font-bold text-slate-800 mb-2.5">
        فصيلة الدم <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
        {BLOOD_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <button
              type="button"
              key={type}
              onClick={() => onChange(type)}
              className={`py-3 px-2 rounded-xl text-center font-bold text-base transition-all border ${
                isSelected
                  ? 'bg-[#D90429] text-white border-[#D90429] shadow-md shadow-red-500/30 scale-105'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#00A3E0] hover:bg-cyan-50/50'
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
