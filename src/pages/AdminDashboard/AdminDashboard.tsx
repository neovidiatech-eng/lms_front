import { useState, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/layout/Header';
import AdminSidebar from './AdminSidebar';
import SubscribePlanModal from '../../components/modals/SubscribePlanModal';
import { useTranslation } from 'react-i18next';

// --- Lazy Loading Dashboard Home ---
const AdminDashboardHome = lazy(() => import('../../features/admin/pages/Dashboard'));

export default function AdminDashboard() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';
  const language = i18n.language.split('-')[0];
  const isRtl = language === 'ar';

  return (
    <div className="min-h-screen bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        userRole="admin"
        userName="Super Admin"
        userEmail="admin@admin.com"
      />

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className={`${isRtl ? (isCollapsed ? 'lg:mr-20' : 'lg:mr-72') : (isCollapsed ? 'lg:ml-20' : 'lg:ml-72')} transition-all duration-300`}>
        <div className="p-6">
          <Suspense fallback={<div className="flex items-center justify-center min-h-[400px] animate-pulse text-gray-400">Loading...</div>}>
            {isHome ? <AdminDashboardHome /> : <Outlet />}
          </Suspense>
        </div>
      </main>

      <SubscribePlanModal isOpen={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
    </div>
  );
}
