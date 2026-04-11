import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TeacherDashboardLayout from './TeacherDashboardLayout';
import ErrorBoundary from '../../components/layout/ErrorBoundary';
import TeacherDashboardHome from './TeacherDashboardHome';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function TeacherDashboard() {
  const location = useLocation();
  const isHome = location.pathname === '/teacher-dashboard' || location.pathname === '/teacher-dashboard/';

  return (
    <ErrorBoundary>
      <TeacherDashboardLayout>
        <Suspense fallback={<LoadingFallback />}>
          {isHome ? <TeacherDashboardHome /> : <Outlet />}
        </Suspense>
      </TeacherDashboardLayout>
    </ErrorBoundary>
  );
}
