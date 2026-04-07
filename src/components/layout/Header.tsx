import { Bell, Menu, Moon, Sun, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage, LanguageContextType, Language } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';

interface HeaderProps {
  onMenuClick: () => void;
  userRole: 'admin' | 'teacher' | 'student';
  userName: string;
  userEmail: string;
}

export default function Header({ onMenuClick, userRole, userName, userEmail }: HeaderProps) {
  const { language, toggleLanguage, t } = useLanguage() as LanguageContextType;
  const { settings } = useSettings();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const roleSubtitle = {
    admin: { ar: 'لوحة التحكم', en: 'Control Panel' },
    teacher: { ar: 'لوحة المعلم', en: 'Teacher Panel' },
    student: { ar: 'لوحة الطالب', en: 'Student Panel' }
  };

  const notifications = [
    { id: 1, text: 'طالب جديد قام بالتسجيل', time: '5 دقائق' },
    { id: 2, text: 'تم إضافة حصة جديدة', time: '30 دقيقة' },
    { id: 3, text: 'معلم جديد في انتظار الموافقة', time: 'ساعة واحدة' }
  ];

  const handleLogout = () => {
    localStorage.removeItem("platform_settings");
    sessionStorage.removeItem("platform_settings");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="logo" className="w-10 h-10 rounded-full object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: settings.primaryColor }}>
                {settings.name.charAt(0)}
              </div>
            )}
            <div className="hidden sm:block text-right">
              <h1 className="text-lg font-bold text-gray-900">{settings.name}</h1>
              <p className="text-xs text-gray-500">{(roleSubtitle[userRole] as any)[language as string]}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleLanguage} className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            {language === 'ar' ? 'العربية' : 'English'}
          </button>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100"><h3 className="font-semibold text-gray-900 text-right">الإشعارات</h3></div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <p className="text-sm text-gray-900 text-right">{notif.text}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">منذ {notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronDown className="w-4 h-4 text-gray-600" />
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.primaryColor }}>
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 text-right">{userName}</p>
                    <p className="text-xs text-gray-500 text-right">{userRole}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-right hover:bg-gray-50 transition-colors flex items-center justify-end gap-2">
                      <span className="text-sm text-gray-700">الملف الشخصي</span>
                      <User className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={handleLogout} className="w-full px-4 py-2 text-right hover:bg-red-50 transition-colors flex items-center justify-end gap-2 text-red-600">
                      <span className="text-sm font-medium">تسجيل الخروج</span>
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
