import { useState } from 'react';
import Header from '../../components/layout/Header';
import StudentSidebar from './StudentSidebar'; // force re-index
import { useLanguage } from '../../contexts/LanguageContext';

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'teacher' | 'student';
  userName?: string;
  userEmail?: string;
}

export default function StudentDashboardLayout({
  children,
  userRole = 'student',
  userName = 'الطالب',
  userEmail = 'student@student.com',
}: StudentDashboardLayoutProps) {
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

      <StudentSidebar
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
