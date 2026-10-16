'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/api';
import { AdminUser } from '../../types';

interface AdminAuthProps {
  onLoginSuccess: (admin: AdminUser, token: string) => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Single admin login form state
  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await apiService.loginAdmin(loginData);
      if (res.success && res.data?.token) {
        localStorage.setItem('najah_admin_token', res.data.token);
        localStorage.setItem('najah_admin_user', JSON.stringify(res.data.admin));
        onLoginSuccess(res.data.admin, res.data.token);
      } else {
        setErrorMsg(res.message || 'بيانات الدخول غير صحيحة');
      }
    } catch (err: any) {
      setErrorMsg('تعذر الاتصال بالخادم، يرجى التأكد من تشغيل السيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border-2 border-slate-200/90 overflow-hidden">
      
      {/* Top Banner with University Navy and Cyan Accent */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0B3A60] to-[#002B49] text-white p-8 text-center border-b-4 border-[#00A3E0]">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
          <ShieldCheck className="w-8 h-8 text-[#00A3E0]" />
        </div>
        <h2 className="text-2xl font-black text-white">بوابة إدارة بنك الدم</h2>
        <p className="text-xs sm:text-sm text-cyan-200 font-semibold mt-1">
          جامعة النجاح الوطنية - تسجيل دخول المسؤول المعتمد
        </p>
      </div>

      <div className="p-8">
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-bold flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SECURE SINGLE LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              اسم المستخدم أو البريد الإلكتروني
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
              <input
                type="text"
                required
                value={loginData.usernameOrEmail}
                onChange={(e) => setLoginData({ ...loginData, usernameOrEmail: e.target.value })}
                placeholder="AdminNajah أو البريد الإلكتروني"
                className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute right-4 top-4" />
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••••••"
                className="w-full pr-12 pl-4 py-3.5 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white text-left dir-ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-[#002B49] hover:bg-[#0B3A60] text-white font-black text-base shadow-xl shadow-slate-950/20 hover:shadow-2xl transition-all cursor-pointer disabled:opacity-50 mt-4 active:scale-98"
          >
            {loading ? 'جاري التحقق والدخول...' : 'دخول إلى لوحة التحكم'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-medium">
            🔒 الدخول مقيد ومخصص لإدارة الجامعة فقط. جميع محاولات الدخول مسجلة ومحمية.
          </p>
        </div>
      </div>

    </div>
  );
};
