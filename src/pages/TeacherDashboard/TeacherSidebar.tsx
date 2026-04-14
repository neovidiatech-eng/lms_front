import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  X,
  ChevronDown,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import { teacherDashboardRoutes } from './teacherDashboardRoutes.tsx';
import { useSettings } from '../../contexts/SettingsContext';
import SidebarToggle from '../../components/layout/SidebarToggle';

interface TeacherSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function TeacherSidebar({ isOpen, onClose, isCollapsed, setIsCollapsed }: TeacherSidebarProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { settings } = useSettings();
  const isRtl = i18n.language.split('-')[0] === 'ar';

  const [expandedItems, setExpandedItems] = useState<string[]>(['academic-content']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isRouteActive = (route: any) => {
    if (route.subItems) {
      return route.subItems.some((sub: any) =>
        location.pathname === `/teacher-dashboard/${sub.path}` ||
        location.pathname.startsWith(`/teacher-dashboard/${sub.path}/`)
      );
    }

    if (route.path === '') {
      return location.pathname === '/teacher-dashboard';
    }

    return location.pathname === `/teacher-dashboard/${route.path}` ||
      location.pathname.startsWith(`/teacher-dashboard/${route.path}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar sidebar */}
      <aside
        className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} 
          ${isCollapsed ? 'w-20' : 'w-72'} bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0
          flex flex-col
          ${isOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'}`}
      >
        {/* Toggle Button for Desktop */}
        <div className="hidden lg:block">
          <SidebarToggle 
            isCollapsed={isCollapsed} 
            onToggle={() => setIsCollapsed(!isCollapsed)} 
          />
        </div>

        <div className={`h-20 flex items-center ${isCollapsed ? 'px-4' : 'px-6'} border-b border-gray-100 flex-shrink-0 transition-all`}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0"
              style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})` }}
            >
              {settings.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="text-right transition-all duration-300">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{settings.name}</h2>
                <p className="text-xs text-gray-500">{t('teacherDashboard')}</p>
              </div>
            )}
          </div>

          <button onClick={onClose} className="lg:hidden mr-auto text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          {teacherDashboardRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = isRouteActive(route);

            if (route.subItems) {
              const isExpanded = expandedItems.includes(route.id);
              return (
                <div key={route.id} className="space-y-1">
                  <button
                    onClick={() => !isCollapsed && toggleExpand(route.id)}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-2.5 rounded-xl transition-all duration-200
                      ${isActive ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    title={isCollapsed ? t(route.label) : ''}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''} ${isActive ? 'opacity-100' : 'opacity-70'}`} style={{ color: isActive ? settings.primaryColor : undefined }} />
                      {!isCollapsed && <span className="font-medium text-sm">{t(route.label)}</span>}
                    </div>
                    {!isCollapsed && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />}
                  </button>


                  {isExpanded && (
                    <div className={`space-y-1 mt-1 ${isRtl ? 'pr-11' : 'pl-11'}`}>
                      {route.subItems.map((subItem) => {
                        const isSubActive = location.pathname === `/teacher-dashboard/${subItem.path}`;
                        return (
                          <NavLink
                            key={subItem.id}
                            to={`/teacher-dashboard/${subItem.path}`}
                            onClick={() => window.innerWidth < 1024 && onClose()}
                            className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200
                              ${isSubActive
                                ? 'bg-white shadow-sm font-medium'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            style={isSubActive ? { color: settings.primaryColor } : {}}
                          >
                            {t(subItem.label)}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={route.id}
                to={`/teacher-dashboard${route.path ? `/${route.path}` : ''}`}
                end={route.path === ''}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => `
                  flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'text-white font-medium shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
                style={({ isActive }) =>
                  isActive ? { backgroundColor: settings.primaryColor } : {}
                }
                title={isCollapsed ? t(route.label) : ''}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''} ${isRouteActive(route) ? 'opacity-100' : 'opacity-70'}`} />
                {!isCollapsed && <span className="font-medium text-sm">{t(route.label)}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Profile and Logout Section */}
        <div className={`p-4 border-t border-gray-100 bg-gray-50/50 mt-auto transition-all ${isCollapsed ? 'px-2' : ''}`}>
          <div className="space-y-1">
            <NavLink
              to="/settings"
              className={({ isActive }) => `
                flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'}
              `}
              style={({ isActive }) => isActive ? { color: settings.primaryColor } : undefined}
              title={isCollapsed ? t('settings') : ''}
            >
              <SettingsIcon className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : ''} opacity-70`} />
              {!isCollapsed && <span>{t('settings')}</span>}
            </NavLink>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors`}
              title={isCollapsed ? t('logout') : ''}
            >
              <LogOut className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span>{t('logout')}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
