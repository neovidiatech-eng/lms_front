import { DollarSign, Calendar, Users, GraduationCap, Clock, FileText, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/layout/Header';
import AdminSidebar from './AdminSidebar';
import { useSettings } from '../../contexts/SettingsContext';
import SubscribePlanModal from '../../components/modals/SubscribePlanModal';
import { useTranslation } from 'react-i18next';

// --- Lazy Loading Dashboard Home ---
const AdminDashboardHome = lazy(() => import('../../features/admin/pages/Dashboard'));

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { settings } = useSettings();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      />

      <main className={`${isRtl ? 'lg:mr-72' : 'lg:ml-72'} transition-all duration-300`}>
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
