import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { DonorForm } from '../components/donor/DonorForm';
import { Heart, Activity, Award, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          
          {/* Enhanced Badge with Pulsing Beating Heart */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-50 via-white to-red-50 border border-[#00A3E0]/30 shadow-sm shadow-cyan-900/5 mb-5 select-none hover:border-[#00A3E0] transition-colors">
            <div className="relative flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#D90429] fill-[#D90429] animate-ping opacity-60 absolute" />
              <Heart className="w-4 h-4 text-[#D90429] fill-[#D90429] relative z-10 animate-pulse" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#002B49] tracking-wide">
              بوابة التبرع الطوعي بالدم | طلبة جامعة النجاح الوطنية
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#00A3E0]" />
          </div>

          {/* Strong Arabic Quranic Ayat & Typography */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#002B49] tracking-tight leading-tight">
            ﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا ﴾
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            منظومة إنسانية جامعية متكاملة وموثوقة لربط المرضى في المستشفيات بالمتبرعين من طلبة جامعة النجاح الوطنية في حالات الطوارئ الطبية وبسرية تامة.
          </p>

          {/* Quick value props cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                <Heart className="w-5 h-5 text-[#D90429] fill-red-100" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800">إنقاذ سريع للحياة</div>
                <div className="text-[11px] text-slate-500 mt-0.5">استجابة طارئة وفورية للمستشفيات</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                <Activity className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800">محرك توافق ذكي</div>
                <div className="text-[11px] text-slate-500 mt-0.5">مطابقة حيوية دقيقة للفصائل المتوافقة</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800">خصوصية وأمان 100%</div>
                <div className="text-[11px] text-slate-500 mt-0.5">وصول مشفر ومقتصر على إدارة الجامعة</div>
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
