'use client';

import React, { useState } from 'react';
import { Heart, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { DonorRegistrationInput } from '../../types';
import { AN_NAJAH_FACULTIES, PALESTINIAN_CITIES } from '../../services/constants';
import { apiService } from '../../services/api';
import { BloodTypeSelector } from './BloodTypeSelector';
import { DonorPersonalFields } from './DonorPersonalFields';

export const DonorForm: React.FC = () => {
  const [formData, setFormData] = useState<DonorRegistrationInput>({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    bloodType: 'A+',
    faculty: AN_NAJAH_FACULTIES[0],
    city: PALESTINIAN_CITIES[0],
    lastDonationDate: '',
    healthCheckPassed: true,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await apiService.registerDonor(formData);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: res.message || 'تم تسجيل بياناتك بنجاح! شكراً لمبادرتك الإنسانية.'
        });
        setFormData({
          fullName: '',
          studentId: '',
          email: '',
          phone: '',
          bloodType: 'A+',
          faculty: AN_NAJAH_FACULTIES[0],
          city: PALESTINIAN_CITIES[0],
          lastDonationDate: '',
          healthCheckPassed: true,
          notes: ''
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.message || 'حدث خطأ أثناء حفظ البيانات، يرجى المحاولة لاحقاً.'
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: 'تعذر الاتصال بالخادم، يرجى التأكد من تشغيل السيرفر.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border-2 border-slate-200/90 overflow-hidden">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0B3A60] to-[#002B49] p-8 sm:p-10 text-white">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#D90429] flex items-center justify-center shadow-xl shadow-red-950/40 shrink-0">
            <Heart className="w-9 h-9 sm:w-10 sm:h-10 text-white fill-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              تسجيل متبرع بالدم - طلبة جامعة النجاح
            </h2>
            <p className="text-sm sm:text-base text-cyan-200 font-semibold mt-1.5">
              قطرة دم تنبض بالأمل.. ساهم في إنقاذ حياة مريض عند الحاجة
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3.5 text-sm sm:text-base bg-white/15 border-2 border-white/25 rounded-2xl px-5 py-3 text-white font-bold shadow-xs">
          <ShieldCheck className="w-6 h-6 text-[#00A3E0] shrink-0 drop-shadow-xs" />
          <span className="leading-relaxed">خصوصية تامة: بياناتك لا تظهر للعامة ومحفوظة لدى الإدارة الطبية بالجامعة فقط للاتصال بك عند الحاجة الطارئة.</span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 sm:p-6 pb-0">
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="text-sm font-medium leading-relaxed">{statusMessage.text}</div>
          </div>
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        <BloodTypeSelector
          selectedType={formData.bloodType}
          onChange={(type) => setFormData({ ...formData, bloodType: type })}
        />

        <DonorPersonalFields formData={formData} setFormData={setFormData} />

        <div>
          <label className="block text-sm font-bold text-slate-800 mb-2">
            ملاحظات إضافية (اختياري)
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="أي تفاصيل تود إضافتها (مثل: أوقات الفراغ للتبرع، إلخ)..."
            className="w-full p-4 text-base font-semibold text-slate-900 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-[#00A3E0] focus:ring-4 focus:ring-[#00A3E0]/15 transition-all bg-white"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-8 rounded-2xl bg-[#002B49] hover:bg-[#0B3A60] text-white font-black text-lg shadow-xl shadow-slate-950/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>جاري حفظ البيانات...</span>
            ) : (
              <>
                <Heart className="w-6 h-6 text-[#D90429] fill-[#D90429] group-hover:scale-125 transition-transform shrink-0" />
                <span>تأكيد التسجيل كمتبرع بالدم</span>
                <Sparkles className="w-5 h-5 text-[#00A3E0] shrink-0" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
