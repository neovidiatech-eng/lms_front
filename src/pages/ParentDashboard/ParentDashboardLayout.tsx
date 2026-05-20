import { useState } from 'react';
import Header from '../../components/layout/Header';
import { useLanguage } from '../../contexts/LanguageContext';
import ParentSidebar from './ParentSideBar';
interface StudentDashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'teacher' | 'student' | 'parent';
  userName?: string;
  userEmail?: string;
}

export default function StudentDashboardLayout({
  children,
  userRole = 'parent',
  userName = 'ولي الأمر',
  userEmail = 'parent@parent.com',
}: StudentDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { language } = useLanguage();

  const isRtl = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
        isCollapsed={isCollapsed}
      />

      <ParentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className={`${isRtl ? (isCollapsed ? 'lg:mr-20' : 'lg:mr-72') : (isCollapsed ? 'lg:ml-20' : 'lg:ml-72')} transition-all duration-300`}>
        <div className={`transition-all duration-300 ${isCollapsed ? 'p-4' : 'p-6'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
