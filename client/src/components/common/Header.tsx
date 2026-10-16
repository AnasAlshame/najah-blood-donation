'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Droplet } from 'lucide-react';

interface HeaderProps {
  isAdmin?: boolean;
  adminName?: string;
  onLogout?: () => void;
  hideAdminButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, adminName, onLogout, hideAdminButton }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin' || hideAdminButton;
  return (
    <header className="bg-gradient-to-r from-[#001f35] via-[#002B49] to-[#001f35] text-white shadow-xl border-b-4 border-[#00A3E0] sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="w-full px-6 sm:px-10 lg:px-14 h-22 flex items-center justify-between">
        
        {/* Right side: Official An-Najah Logo & Enhanced Typography */}
        <Link href="/" className="flex items-center gap-4 group select-none">
          {/* Logo container with elegant white circle framing */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 shadow-lg ring-2 ring-[#00A3E0]/40 group-hover:ring-[#00A3E0] group-hover:scale-105 transition-all duration-300 shrink-0">
            <Image
              src="/najah-logo.png"
              alt="شعار جامعة النجاح الوطنية"
              width={64}
              height={64}
              className="w-full h-full object-contain rounded-full"
              priority
            />
          </div>

          {/* Typography */}
          <div className="flex flex-col text-right justify-center">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#00A3E0] tracking-wide">
                جامعة النّجاح الوطنيّة
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">|</span>
              <span className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wider hidden sm:inline">
                An-Najah National University
              </span>
            </div>

            <div className="flex items-center gap-2.5 mt-0.5">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs">
                منصّة بنك دم الجامعة
              </h1>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D90429] to-[#b00321] text-white text-[11px] font-bold shadow-md shadow-red-950/40 border border-red-400/20">
                <Droplet className="w-3 h-3 fill-white" />
                <span>حياة وأمل</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Left side: Admin Actions Button */}
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
          ) : isLoginPage ? null : (
            <Link
              href="/admin"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-[#00A3E0] px-4 sm:px-5 py-2.5 rounded-xl border border-white/20 hover:border-[#00A3E0] transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer"
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
