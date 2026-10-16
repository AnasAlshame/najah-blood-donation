import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

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
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className={`${cairo.className} min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#00A3E0] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
