'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002B49] text-slate-300 py-8 border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span>منصة بنك الدم لطلبة جامعة النجاح الوطنية</span>
          <span>•</span>
          <span>نابلس، فلسطين</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Shield className="w-4 h-4 text-[#00A3E0]" />
          <span>البيانات مشفرة ومحفوظة بسرية تامة وتخضع لإشراف إدارة الجامعة فقط</span>
        </div>
        <div>
          © 2026 عمادة شؤون الطلبة - جامعة النجاح الوطنية
        </div>
      </div>
    </footer>
  );
};
