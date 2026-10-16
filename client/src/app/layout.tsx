import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منصة التبرع بالدم | جامعة النجاح الوطنية',
  description: 'منصة رسمية لحفظ بيانات متبرعي الدم من طلبة جامعة النجاح الوطنية وتسهيل إنقاذ الأرواح',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&family=Tajawal:wght@400;500;700;800;900&family=Cairo:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#00A3E0] selection:text-white">
        {children}
      </body>
    </html>
  );
}
