import React from 'react';
import Link from 'next/link';
import { Droplet, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
  adminName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, adminName, onLogout }) => {
  return (
    <header className="bg-[#002B49] text-white shadow-lg border-b-4 border-[#00A3E0] sticky top-0 z-50 w-full">
      {/* Full width container with generous side padding to push items to the edges gracefully */}
      <div className="w-full px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
        
        {/* Right side in RTL (Logo and University Title) */}
        <Link href="/" className="flex items-center gap-3.5 group select-none">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 border border-white/20 group-hover:bg-white/15 group-hover:scale-105 transition-all shadow-inner">
            <div className="relative">
              <Droplet className="w-7 h-7 text-[#D90429] fill-[#D90429] drop-shadow-sm" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00A3E0] rounded-full border-2 border-[#002B49]" />
            </div>
          </div>

          <div className="flex flex-col text-right">
            <div className="text-[11px] sm:text-xs text-[#00A3E0] font-semibold tracking-wide">
              جامعة النجاح الوطنية | An-Najah National University
            </div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-2 mt-0.5">
              <span>منصة بنك دم الجامعة</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#D90429] text-white font-medium shadow-xs">
                حياة وأمل
              </span>
            </div>
          </div>
        </Link>

        {/* Left side in RTL (Admin Actions Button) */}
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex text-xs bg-white/10 text-white/95 px-3.5 py-2 rounded-xl border border-white/15 font-medium">
                مرحباً، {adminName || 'المسؤول'}
              </span>
              <button
                onClick={onLogout}
                className="text-xs sm:text-sm bg-[#D90429] hover:bg-[#b00321] text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <Link
              href="/admin"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-[#00A3E0] px-4 sm:px-5 py-2.5 rounded-xl border border-white/20 hover:border-[#00A3E0] transition-all shadow-sm hover:shadow-md group cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#00A3E0] group-hover:text-white transition-colors" />
              <span>دخول المسؤولين</span>
            </Link>
          )}
        </div>

      </div>
    </header>
  );
};
