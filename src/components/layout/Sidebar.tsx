  import { Home, Users, BookOpen, DollarSign, PlayCircle, Settings, ChevronDown, X, CreditCard, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: { ar: string; en: string };
  icon: any;
  path: string;
  subItems?: { id: string; label: { ar: string; en: string }; path: string }[];
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const [expandedItems, setExpandedItems] = useState<string[]>(['users']);

  const adminMenuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: { ar: 'الرئيسية', en: 'Dashboard' },
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'lms',
      label: { ar: 'LMS', en: 'LMS' },
      icon: PlayCircle,
      path: '/dashboard/lms',
      subItems: [
        { id: 'lms-courses', label: { ar: 'الكورسات', en: 'Courses' }, path: '/dashboard/lms-courses' }
      ]
    },
    {
      id: 'users',
      label: { ar: 'إدارة المستخدمين', en: 'User Management' },
      icon: Users,
      path: '/dashboard/users',
      subItems: [
        { id: 'admins', label: { ar: 'المستخدمين', en: 'Users' }, path: '/dashboard/admins' },
        { id: 'students', label: { ar: 'الطلاب', en: 'Students' }, path: '/dashboard/students' },
        { id: 'parents', label: { ar: 'أولياء الأمور', en: 'Parents' }, path: '/dashboard/parents' }
      ]
    },
    {
      id: 'teachers-section',
      label: { ar: 'المعلمين', en: 'Teachers' },
      icon: GraduationCap,
      path: '/dashboard/teachers',
      subItems: [
        { id: 'teachers', label: { ar: 'المعلمين', en: 'Teachers' }, path: '/dashboard/teachers' },
        { id: 'teacher-requests', label: { ar: 'طلبات المعلمين', en: 'Teacher Requests' }, path: '/dashboard/teacher-requests' },
        { id: 'teacher-availability', label: { ar: 'المعلمين المتاحين', en: 'Teacher Availability' }, path: '/dashboard/teacher-availability' },
        { id: 'subjects', label: { ar: 'المواد', en: 'Subjects' }, path: '/dashboard/subjects' }
      ]
    },
    {
      id: 'content',
      label: { ar: 'المحتوى الأكاديمي', en: 'Academic Content' },
      icon: BookOpen,
      path: '/dashboard/content',
      subItems: [
        { id: 'sessions', label: { ar: 'الحصص', en: 'Sessions' }, path: '/dashboard/sessions' },
        { id: 'agenda', label: { ar: 'الأجندة', en: 'Agenda' }, path: '/dashboard/agenda' },
        { id: 'exams', label: { ar: 'الامتحانات', en: 'Exams' }, path: '/dashboard/exams' },
        { id: 'assignments', label: { ar: 'الواجبات', en: 'Assignments' }, path: '/dashboard/assignments' }
      ]
    },
    {
      id: 'subscriptions',
      label: { ar: 'الاشتراكات', en: 'Subscriptions' },
      icon: CreditCard,
      path: '/dashboard/subscriptions',
      subItems: [
        { id: 'subscription-requests', label: { ar: 'طلبات الاشتراك', en: 'Subscription Requests' }, path: '/dashboard/subscription-requests' },
        { id: 'all-subscriptions', label: { ar: 'كل الاشتراكات', en: 'All Subscriptions' }, path: '/dashboard/all-subscriptions' },
        { id: 'plans', label: { ar: 'الخطط', en: 'Plans' }, path: '/dashboard/plans' }
      ]
    },
    {
      id: 'finance',
      label: { ar: 'الماليات', en: 'Finance' },
      icon: DollarSign,
      path: '/dashboard/finance',
      subItems: [
        { id: 'currencies', label: { ar: 'العملات', en: 'Currencies' }, path: '/dashboard/currencies' },
        { id: 'expenses', label: { ar: 'المصروفات', en: 'Expenses' }, path: '/dashboard/expenses' },
        { id: 'transactions', label: { ar: 'المعاملات', en: 'Transactions' }, path: '/dashboard/transactions' }
      ]
    },
    {
      id: 'settings',
      label: { ar: 'الإعدادات', en: 'Settings' },
      icon: Settings,
      path: '/dashboard/settings'
    }
  ];

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full bg-white border-${language === 'ar' ? 'l' : 'r'} border-gray-200 w-72 transform transition-transform duration-300 z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="logo" className="w-12 h-12 rounded-xl object-contain" />
            ) : (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg text-white font-bold text-xl" style={{ background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})` }}>
                {settings.name.charAt(0)}
              </div>
            )}
            <div className="text-right">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{settings.name}</h2>
              <p className="text-xs text-gray-500">لوحة التحكم</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
          <div className="space-y-1">
            {adminMenuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-gray-700 hover:bg-gray-50`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium flex-1 text-right">{item.label[language]}</span>
                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 transition-transform ${
                          expandedItems.includes(item.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedItems.includes(item.id) && (
                      <div className="mr-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <NavLink
                            key={subItem.id}
                            to={subItem.path}
                            onClick={onClose}
                            className={({ isActive }) => `
                              w-full block text-right px-4 py-2 rounded-lg text-sm transition-all
                              ${isActive ? 'font-medium' : 'text-gray-600 hover:bg-gray-50'}
                            `}
                            style={({ isActive }) => isActive ? { backgroundColor: settings.primaryColor + '15', color: settings.primaryColor } : {}}
                          >
                            {subItem.label[language]}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${isActive ? '' : 'text-gray-700 hover:bg-gray-50'}
                    `}
                    style={({ isActive }) => isActive ? { backgroundColor: settings.primaryColor + '15', color: settings.primaryColor } : {}}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium flex-1 text-right">{item.label[language]}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}

