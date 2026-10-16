'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Mail, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService } from '../../services/api';
import { AdminUser } from '../../types';

interface AdminAuthProps {
  onLoginSuccess: (admin: AdminUser, token: string) => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });
  const [regData, setRegData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    passcode: ''
  });

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
      setErrorMsg('تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await apiService.registerAdmin(regData);
      if (res.success && res.data?.token) {
        setSuccessMsg('تم إنشاء الحساب بنجاح! يتم نقلك الآن...');
        localStorage.setItem('najah_admin_token', res.data.token);
        localStorage.setItem('najah_admin_user', JSON.stringify(res.data.admin));
        setTimeout(() => {
          onLoginSuccess(res.data.admin, res.data.token);
        }, 1200);
      } else {
        setErrorMsg(res.message || 'فشل تسجيل حساب المسؤول');
      }
    } catch (err: any) {
      setErrorMsg('تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      
      {/* Top Banner */}
      <div className="bg-[#002B49] text-white p-6 text-center border-b-4 border-[#00A3E0]">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/20">
          <ShieldCheck className="w-6 h-6 text-[#00A3E0]" />
        </div>
        <h2 className="text-xl font-bold">بوابة إدارة بنك الدم</h2>
        <p className="text-xs text-cyan-200 mt-1">جامعة النجاح الوطنية - تسجيل دخول المسؤولين</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        <button
          onClick={() => { setIsLoginTab(true); setErrorMsg(null); }}
          className={`flex-1 py-3 text-sm font-bold transition-all text-center ${
            isLoginTab ? 'bg-white text-[#002B49] border-b-2 border-[#002B49]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          تسجيل الدخول
        </button>
        <button
          onClick={() => { setIsLoginTab(false); setErrorMsg(null); }}
          className={`flex-1 py-3 text-sm font-bold transition-all text-center ${
            !isLoginTab ? 'bg-white text-[#002B49] border-b-2 border-[#002B49]' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          حساب مسؤول جديد
        </button>
      </div>

      <div className="p-6">
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {isLoginTab ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                اسم المستخدم أو البريد الإلكتروني
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={loginData.usernameOrEmail}
                  onChange={(e) => setLoginData({ ...loginData, usernameOrEmail: e.target.value })}
                  placeholder="admin أو البريد الإلكتروني"
                  className="w-full pr-9 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pr-9 pl-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 text-left dir-ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#0B3A60] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'جاري التحقق...' : 'دخول إلى لوحة التحكم'}
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                الاسم الرباعي
              </label>
              <input
                type="text"
                required
                value={regData.fullName}
                onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                placeholder="د. أحمد خليل"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                اسم المستخدم
              </label>
              <input
                type="text"
                required
                value={regData.username}
                onChange={(e) => setRegData({ ...regData, username: e.target.value })}
                placeholder="ahmad_admin"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                placeholder="admin@najah.edu"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                رمز تفويض الإدارة (Passcode)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="password"
                  required
                  value={regData.passcode}
                  onChange={(e) => setRegData({ ...regData, passcode: e.target.value })}
                  placeholder="رمز الأمان المعتمد (الافتراضي: NAJAH_ADMIN_2026)"
                  className="w-full pr-9 pl-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0]"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                * رمز الأمان المبدئي لحماية النظام: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">NAJAH_ADMIN_2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#00A3E0] hover:bg-[#008bc0] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'جاري التسجيل...' : 'إنشاء حساب وتفعيل الصلاحية'}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
