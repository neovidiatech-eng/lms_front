import { useState } from 'react';
import Sidebar from './Sidebar';
import { DashboardLayoutProps } from '../../types/dashboardLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();

  const isRtl = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className={`${isRtl ? 'lg:mr-3' : 'lg:ml-3'} transition-all duration-300`}>
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
