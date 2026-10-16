import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { DonorForm } from '../components/donor/DonorForm';
import { Heart, Activity, Award, ShieldAlert } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#002B49] text-xs sm:text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D90429] animate-ping" />
            <span>بوابة التبرع الطوعي بالدم لطلبة جامعة النجاح الوطنية</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight">
            ومن أحياها فكأنما أحيا الناس جميعاً
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            منصة مخصصة لربط الحالات الإنسانية والطبية الحرجة بالمتبرعين من طلبة الجامعة عند الطوارئ، بإشراف طبي وأكاديمي مباشر وبسرية تامة.
          </p>

          {/* Quick value props cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-[#D90429]" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800">إنقاذ سريع للحياة</div>
                <div className="text-[11px] text-slate-500">استجابة طارئة للمستشفيات</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800">توافق فصائل ذكي</div>
                <div className="text-[11px] text-slate-500">حساب طبي دقيق للفصائل المتوافقة</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800">خصوصية وأمان</div>
                <div className="text-[11px] text-slate-500">حماية كاملة لبيانات الطلبة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <DonorForm />

      </main>

      <Footer />
    </>
  );
}
