'use client';

import React, { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { AdminAuth } from '../../components/admin/AdminAuth';
import { AdminFilters } from '../../components/admin/AdminFilters';
import { DonorTable } from '../../components/admin/DonorTable';
import { apiService } from '../../services/api';
import { IDonor, AdminUser } from '../../types';
import { ShieldCheck, Heart, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Donors state
  const [donors, setDonors] = useState<IDonor[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filters state
  const [selectedBloodType, setSelectedBloodType] = useState<string>('');
  const [matchCompatible, setMatchCompatible] = useState<boolean>(true);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Check existing session
  useEffect(() => {
    const savedToken = localStorage.getItem('najah_admin_token');
    const savedUser = localStorage.getItem('najah_admin_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setAdmin(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('najah_admin_token');
        localStorage.removeItem('najah_admin_user');
      }
    }
    setInitializing(false);
  }, []);

  // Fetch donors callback
  const fetchDonors = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await apiService.getDonors(token, {
        bloodType: selectedBloodType || undefined,
        matchCompatible,
        faculty: selectedFaculty,
        city: selectedCity,
        status: selectedStatus,
        search: searchTerm
      });

      if (res.success) {
        setDonors(res.data);
      } else {
        if (res.message?.includes('منتهية') || res.message?.includes('غير مصرح')) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token, selectedBloodType, matchCompatible, selectedFaculty, selectedCity, selectedStatus, searchTerm]);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        fetchDonors();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [fetchDonors, token]);

  const handleLoginSuccess = (adminUser: AdminUser, jwtToken: string) => {
    setAdmin(adminUser);
    setToken(jwtToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('najah_admin_token');
    localStorage.removeItem('najah_admin_user');
    setAdmin(null);
    setToken(null);
    setDonors([]);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await apiService.updateDonorStatus(token, id, { status: newStatus });
      if (res.success) {
        setNotification({ type: 'success', text: 'تم تحديث حالة المتبرع بنجاح' });
        setDonors((prev) => prev.map((d) => (d._id === id ? { ...d, status: newStatus as any } : d)));
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      setNotification({ type: 'error', text: 'فشل تحديث الحالة' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا المتبرع من السجل نهائياً؟')) return;

    try {
      const res = await apiService.deleteDonor(token, id);
      if (res.success) {
        setNotification({ type: 'success', text: 'تم حذف المتبرع بنجاح' });
        setDonors((prev) => prev.filter((d) => d._id !== id));
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      setNotification({ type: 'error', text: 'فشل حذف المتبرع' });
    }
  };

  // Export donors to Excel
  const handleExportToExcel = () => {
    if (donors.length === 0) {
      alert('لا توجد بيانات لتصديرها');
      return;
    }

    const exportData = donors.map((d, index) => ({
      '#': index + 1,
      'الاسم الكامل': d.fullName,
      'الرقم الجامعي': d.studentId,
      'فصيلة الدم': d.bloodType,
      'رقم الهاتف': d.phone,
      'البريد الإلكتروني': d.email,
      'الكلية': d.faculty,
      'المدينة': d.city,
      'حالة التوفر': d.status === 'available' ? 'متاح' : d.status === 'donated_recently' ? 'تبرع مؤخراً' : 'غير متاح',
      'تاريخ التسجيل': new Date(d.createdAt).toLocaleDateString('ar-EG'),
      'تاريخ آخر تبرع': d.lastDonationDate ? new Date(d.lastDonationDate).toLocaleDateString('ar-EG') : 'غير مسجل',
      'ملاحظات': d.notes || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'متبرعو الدم');
    XLSX.writeFile(workbook, `سجل_متبرعي_دم_جامعة_النجاح_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 border-4 border-[#002B49] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header isAdmin={!!admin} adminName={admin?.fullName} onLogout={handleLogout} />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {!admin || !token ? (
          <div className="py-8">
            <AdminAuth onLoginSuccess={handleLoginSuccess} />
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Top Admin Welcome Card */}
            <div className="bg-[#002B49] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-[#00A3E0] shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="w-6 h-6 text-[#00A3E0]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">لوحة إدارة بنك الدم والبحث الفوري</h1>
                  <p className="text-xs text-cyan-200 mt-0.5">
                    التحكم بالمتبرعين، فحص التوافق الحيوي للفصائل، وسرعة الاستجابة الطارئة
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/15 text-xs">
                <span>المسؤول الحالي:</span>
                <span className="font-bold text-[#00A3E0]">{admin.fullName}</span>
              </div>
            </div>

            {/* Notification alert */}
            {notification && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-2 ${
                  notification.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{notification.text}</span>
              </div>
            )}

            {/* Filters component */}
            <AdminFilters
              selectedBloodType={selectedBloodType}
              setSelectedBloodType={setSelectedBloodType}
              matchCompatible={matchCompatible}
              setMatchCompatible={setMatchCompatible}
              selectedFaculty={selectedFaculty}
              setSelectedFaculty={setSelectedFaculty}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onRefresh={fetchDonors}
              onExport={handleExportToExcel}
              totalDonorsCount={donors.length}
            />

            {/* Donors Table */}
            <DonorTable
              donors={donors}
              loading={loading}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />

          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
