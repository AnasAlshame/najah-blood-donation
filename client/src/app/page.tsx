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
          </div>

          {/* Clean, perfectly readable Arabic Quranic Ayah on a single line */}
          <div className="w-full overflow-hidden px-2">
            <h1 className="quran-ayah text-2xl sm:text-4xl md:text-5xl font-bold text-[#002B49] whitespace-nowrap text-center mx-auto py-2 leading-relaxed">
              ( وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا )
            </h1>
          </div>
          
          <p className="mt-4 text-base sm:text-lg text-slate-900 max-w-2xl mx-auto leading-relaxed font-bold">
            منظومة إنسانية جامعية متكاملة وموثوقة لربط المرضى في المستشفيات بالمتبرعين من طلبة جامعة النجاح الوطنية في حالات الطوارئ الطبية وبسرية تامة.
          </p>

          {/* Quick value props cards with bold, crisp, readable fonts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mt-10">
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                <Heart className="w-7 h-7 text-[#D90429] fill-red-100" />
              </div>
              <div className="text-right">
                <div className="text-base sm:text-lg font-black text-[#002B49] leading-snug">إنقاذ سريع للحياة</div>
                <div className="text-xs sm:text-sm text-slate-700 font-bold leading-normal mt-1">استجابة طارئة وفورية للمستشفيات</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100 shadow-2xs">
                <Activity className="w-7 h-7 text-[#00A3E0]" />
              </div>
              <div className="text-right">
                <div className="text-base sm:text-lg font-black text-[#002B49] leading-snug">محرك توافق ذكي</div>
                <div className="text-xs sm:text-sm text-slate-700 font-bold leading-normal mt-1">مطابقة حيوية دقيقة للفصائل المتوافقة</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="text-right">
                <div className="text-base sm:text-lg font-black text-[#002B49] leading-snug">خصوصية وأمان</div>
                <div className="text-xs sm:text-sm text-slate-700 font-bold leading-normal mt-1">وصول مشفر ومقتصر على إدارة الجامعة</div>
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
