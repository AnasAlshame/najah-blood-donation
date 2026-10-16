import React from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { DonorForm } from '../components/donor/DonorForm';
import { Heart, Activity, Award, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          
          {/* Enhanced Badge with Pulsing Beating Heart */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border-2 border-cyan-200/80 shadow-sm shadow-cyan-900/10 mb-6 select-none hover:border-[#00A3E0] transition-colors">
            <div className="relative flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#D90429] fill-[#D90429] animate-ping opacity-60 absolute" />
              <Heart className="w-4 h-4 text-[#D90429] fill-[#D90429] relative z-10 animate-pulse" />
            </div>
            <span className="text-sm sm:text-base font-bold text-[#002B49] tracking-normal">
              بوابة التبرع الطوعي بالدم | طلبة جامعة النجاح الوطنية
            </span>
            <Sparkles className="w-4 h-4 text-[#00A3E0]" />
          </div>

          {/* Clean, perfectly readable Arabic Quranic Ayah on a single line */}
          <div className="w-full overflow-hidden px-2">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#002B49] tracking-normal leading-normal whitespace-nowrap text-center mx-auto">
              ( وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا )
            </h1>
          </div>
          
          <p className="mt-4 text-base sm:text-lg text-slate-800 max-w-2xl mx-auto leading-relaxed font-medium">
            منظومة إنسانية جامعية متكاملة وموثوقة لربط المرضى في المستشفيات بالمتبرعين من طلبة جامعة النجاح الوطنية في حالات الطوارئ الطبية وبسرية تامة.
          </p>

          {/* Quick value props cards with crisp readable fonts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mt-10">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                <Heart className="w-6 h-6 text-[#D90429] fill-red-100" />
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-slate-900">إنقاذ سريع للحياة</div>
                <div className="text-xs text-slate-600 font-medium mt-1">استجابة طارئة وفورية للمستشفيات</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                <Activity className="w-6 h-6 text-[#00A3E0]" />
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-slate-900">محرك توافق ذكي</div>
                <div className="text-xs text-slate-600 font-medium mt-1">مطابقة حيوية دقيقة للفصائل المتوافقة</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-slate-900">خصوصية وأمان 100%</div>
                <div className="text-xs text-slate-600 font-medium mt-1">وصول مشفر ومقتصر على إدارة الجامعة</div>
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
