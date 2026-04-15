import { Calendar, FileText, CheckCircle, AlertCircle, Sparkles, ClipboardList, Package, Play, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Outlet, useLocation, Routes, Route } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import SubscribePlanModal from '../../components/modals/SubscribePlanModal';
import { useTranslation } from 'react-i18next';
import StudentDashboardLayout from './StudentDashboardLayout';
import { studentDashboardRoutes } from './studentDashboardRoutes';

export default function StudentDashboard() {
  const { t } = useTranslation();
  const location = useLocation();
  const { settings } = useSettings();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  // Student-specific mock stats
  const stats = {
    sessions: { total: 8, thisWeek: 3, today: 1 },
    assignments: { total: 9, pending: 6, completed: 3 },
    exams: { total: 5, completed: 2, upcoming: 3 },
    courses: { total: 4, inProgress: 2, completed: 2 },
  };

  const alerts = [
    { type: 'warning', title: t('alerts'), message: t('noAlerts'), icon: AlertCircle },
    { type: 'success', title: t('status'), message: t('allSystemsNormal'), icon: CheckCircle },
    { type: 'info', title: t('needs'), message: t('dataAutoUpdate'), icon: FileText },
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color, hexColor, details }: any) => (
    <div
      className={`bg-white rounded-2xl p-6 border-r-4 shadow-sm hover:shadow-md transition-shadow ${!hexColor ? color : ''}`}
      style={hexColor ? { borderRightColor: hexColor } : {}}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-right flex-1">
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div
          className={`p-3 rounded-xl ${!hexColor ? color.replace('border', 'bg').replace('500', '100') : ''}`}
          style={hexColor ? { backgroundColor: hexColor + '20' } : {}}
        >
          <Icon
            className={`w-8 h-8 ${!hexColor ? color.replace('border', 'text') : ''}`}
            style={hexColor ? { color: hexColor } : {}}
          />
        </div>
      </div>
      {details && (
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {details.map((detail: any, idx: number) => (
            <div key={idx} className="text-right">
              <p className="text-xs text-gray-500">{detail.label}</p>
              <p className={`text-sm font-semibold ${detail.color || 'text-gray-900'}`}>
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const SmallStatCard = ({ title, value, details, icon: Icon, color, hexColor }: any) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="text-right flex-1">
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <h4 className="text-3xl font-bold text-gray-900">{value}</h4>
        </div>
        <div
          className={`p-3 rounded-lg ${!hexColor ? color : ''}`}
          style={hexColor ? { backgroundColor: hexColor } : {}}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        {details.map((detail: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className={detail.color || 'text-gray-600'}>{detail.label}</span>
            <span className="font-medium text-gray-900">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const AlertCard = ({ type, title, message, icon: Icon }: any) => {
    const colors: Record<string, string> = {
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      info: '',
    };
    const iconColors: Record<string, string> = {
      warning: 'text-yellow-600',
      success: 'text-green-600',
      info: '',
    };
    const isInfo = type === 'info';

    return (
      <div
        className={`rounded-xl p-6 border ${!isInfo ? colors[type] : ''}`}
        style={
          isInfo
            ? {
                backgroundColor: settings.primaryColor + '10',
                borderColor: settings.primaryColor + '40',
                color: settings.primaryColor + 'cc',
              }
            : {}
        }
      >
        <div className="flex items-start gap-3">
          <Icon
            className={`w-6 h-6 ${!isInfo ? iconColors[type] : ''} flex-shrink-0`}
            style={isInfo ? { color: settings.primaryColor } : {}}
          />
          <div className="text-right flex-1">
            <h4 className="font-bold mb-1 flex items-center gap-2">
              <span>{title}</span>
              {type === 'warning' && <span className="text-sm">⚠️</span>}
              {type === 'success' && <span className="text-sm">✅</span>}
              {type === 'info' && <span className="text-sm">📊</span>}
            </h4>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStudentHome = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.accentColor})` }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-right">مرحباً بك في لوحة الطالب 👋</h1>
            <p className="text-right opacity-80">تابع حصصك وواجباتك وامتحاناتك من مكان واحد</p>
          </div>
          <button
            onClick={() => setShowSubscribeModal(true)}
            className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:-translate-y-1"
          >
            <Sparkles className="w-5 h-5" />
            {t('subscribeToUnlock')}
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title={t('sessions')}
          value={stats.sessions.total}
          icon={Calendar}
          color=""
          hexColor={settings.primaryColor}
          details={[
            { label: t('today'), value: stats.sessions.today },
            { label: t('thisWeek'), value: stats.sessions.thisWeek },
          ]}
        />
        <StatCard
          title={t('assignments')}
          value={stats.assignments.total}
          icon={ClipboardList}
          color="border-green-500"
          details={[
            { label: t('pending'), value: stats.assignments.pending, color: 'text-orange-600' },
            { label: t('completed'), value: stats.assignments.completed },
          ]}
        />
        <StatCard
          title={t('exams')}
          value={stats.exams.total}
          icon={FileText}
          color="border-red-500"
          details={[
            { label: t('completed'), value: stats.exams.completed },
            { label: t('upcoming'), value: stats.exams.upcoming, color: 'text-orange-600' },
          ]}
        />
        <StatCard
          title="الكورسات"
          value={stats.courses.total}
          icon={Play}
          color="border-purple-500"
          details={[
            { label: 'قيد التقدم', value: stats.courses.inProgress, color: 'text-blue-600' },
            { label: t('completed'), value: stats.courses.completed },
          ]}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SmallStatCard
          title="المحتوى الأكاديمي"
          value={stats.sessions.total + stats.assignments.total + stats.exams.total}
          icon={BookOpen}
          color=""
          hexColor={settings.primaryColor}
          details={[
            { label: 'حصص', value: stats.sessions.total },
            { label: 'واجبات + امتحانات', value: stats.assignments.total + stats.exams.total },
          ]}
        />
        <SmallStatCard
          title={t('assignments')}
          value={stats.assignments.total}
          icon={ClipboardList}
          color="bg-green-500"
          details={[
            { label: t('pending'), value: stats.assignments.pending, color: 'text-orange-600' },
            { label: t('completed'), value: stats.assignments.completed },
          ]}
        />
        <SmallStatCard
          title="الخطط والاشتراكات"
          value={stats.courses.total}
          icon={Package}
          color="bg-purple-500"
          details={[
            { label: 'كورسات نشطة', value: stats.courses.inProgress, color: 'text-green-600' },
            { label: 'منتهية', value: stats.courses.completed },
          ]}
        />
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alerts.map((alert, idx) => (
          <AlertCard key={idx} {...alert} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <StudentDashboardLayout>
        <Routes>
          <Route index element={renderStudentHome()} />
          {studentDashboardRoutes.flatMap(route => {
            if (route.subItems) {
              return route.subItems.map(subItem => (
                <Route key={subItem.id} path={subItem.path} element={subItem.element} />
              ));
            }
            return route.element ? [<Route key={route.id} path={route.path} element={route.element} />] : [];
          })}
        </Routes>
        <Outlet />
      </StudentDashboardLayout>
      <SubscribePlanModal isOpen={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
    </>
  );
}

