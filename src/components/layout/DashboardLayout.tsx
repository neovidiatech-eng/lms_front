import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { DashboardLayoutProps } from '../../types/dashboardLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function DashboardLayout({
  children,
  userRole = 'admin',
  userName = 'Super Admin',
  userEmail = 'admin@admin.com'
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language } = useLanguage();

  const isRtl = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className={`${isRtl ? 'lg:mr-72' : 'lg:ml-72'} transition-all duration-300`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
