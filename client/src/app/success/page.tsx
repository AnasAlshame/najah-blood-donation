import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { CheckCircle2, Heart, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function SuccessPage() {
  return (
    <>
      <Header />

      <main className="flex-1 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex items-center justify-center">
        
        {/* Main Success Card */}
        <div className="w-full bg-white rounded-3xl shadow-2xl border-2 border-slate-200/90 overflow-hidden text-center animate-in fade-in-50 zoom-in-95 duration-200">
          
          {/* Top Banner with University Navy and Blood Red */}
          <div className="bg-gradient-to-r from-[#002B49] via-[#0B3A60] to-[#002B49] p-8 sm:p-12 text-white relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-xl">
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              تم تسجيلك كمتبرع بالدم بنجاح!
            </h1>
            <p className="text-base sm:text-lg text-cyan-200 font-semibold mt-2">
              شكراً لمبادرتك الإنسانية النبيلة في جامعة النجاح الوطنية
            </p>
          </div>

          {/* Card Body */}
          <div className="p-8 sm:p-12 space-y-8">
            
            {/* Ayat & Impact Quote */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 text-slate-800 space-y-2">
              <div className="text-xl sm:text-2xl font-bold text-[#002B49] quran-ayah">
                ﴿ وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا ﴾
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-700 leading-relaxed pt-2">
                لقد ساهمت في بناء مجتمع جامعي متكافل؛ بياناتك أصبحت الآن مسجلة بأمان لدى الإدارة الطبية بالجامعة، وسيتم الاتصال بك عند وجود حاجة طارئة ومستعجلة لإنقاذ حياة مريض.
              </p>
            </div>

            {/* Reassurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-950">بياناتك مشفرة ومحمية</div>
                  <div className="text-xs text-emerald-800 font-semibold mt-0.5">لا تظهر للعامة ومخصصة للإشراف الطبي فقط</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-red-50/80 border border-red-200">
                <div className="w-10 h-10 rounded-xl bg-[#D90429] text-white flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-red-950">عطاء ينبض بالحياة</div>
                  <div className="text-xs text-red-800 font-semibold mt-0.5">تبرعك يصنع فارقاً حقيقياً في إنقاذ الأرواح</div>
                </div>
              </div>
            </div>

            {/* Back Button to Registration Page */}
            <div className="pt-4">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-10 rounded-2xl bg-[#002B49] hover:bg-[#0B3A60] text-white font-black text-base sm:text-lg shadow-xl shadow-slate-900/15 hover:shadow-2xl transition-all cursor-pointer group"
              >
                <span>العودة لصفحة التسجيل الرئيسية</span>
                <ArrowRight className="w-5 h-5 text-[#00A3E0] group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
