import React from 'react';
import Link from 'next/link';
import { Droplet, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
  adminName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, adminName, onLogout }) => {
  return (
    <header className="bg-[#002B49] text-white shadow-md border-b-4 border-[#00A3E0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* University & Platform Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 border border-white/20 group-hover:scale-105 transition-transform">
            <div className="relative">
              <Droplet className="w-7 h-7 text-[#D90429] fill-[#D90429]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00A3E0] rounded-full border border-white" />
            </div>
          </div>
          <div>
            <div className="text-xs text-[#00A3E0] font-medium tracking-wide">
              جامعة النجاح الوطنية | An-Najah National University
            </div>
            <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>منصة بنك دم الجامعة</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#D90429]/80 text-white font-normal">
                حياة وأمل
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs bg-white/10 text-white/90 px-3 py-1.5 rounded-lg border border-white/15">
                مرحباً، {adminName || 'المسؤول'}
              </span>
              <button
                onClick={onLogout}
                className="text-xs sm:text-sm bg-red-600/90 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-lg border border-white/20 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#00A3E0]" />
                <span>دخول المسؤولين</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
