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
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#0B3A60] to-[#002B49] p-6 sm:p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D90429] flex items-center justify-center shadow-lg shadow-red-900/40">
            <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">تسجيل متبرع بالدم - طلبة جامعة النجاح</h2>
            <p className="text-sm text-cyan-200 mt-1">
              قطرة دم تنبض بالأمل.. ساهم في إنقاذ حياة مريض عند الحاجة
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-slate-200">
          <ShieldCheck className="w-4 h-4 text-[#00A3E0] shrink-0" />
          <span>خصوصية تامة: بياناتك لا تظهر للعامة ومحفوظة لدى الإدارة الطبية بالجامعة فقط للاتصال بك عند الحاجة الطارئة.</span>
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
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            ملاحظات إضافية (اختياري)
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="أي تفاصيل تود إضافتها (مثل: أوقات الفراغ للتبرع، إلخ)..."
            className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#002B49] hover:bg-[#0B3A60] text-white font-bold text-base shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>جاري حفظ البيانات...</span>
            ) : (
              <>
                <Heart className="w-5 h-5 text-[#D90429] fill-[#D90429] group-hover:scale-125 transition-transform" />
                <span>تأكيد التسجيل كمتبرع بالدم</span>
                <Sparkles className="w-4 h-4 text-[#00A3E0]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
