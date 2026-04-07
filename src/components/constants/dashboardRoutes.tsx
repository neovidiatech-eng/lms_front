import { lazy, ReactNode } from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  DollarSign, 
  PlayCircle, 
  Settings, 
  CreditCard, 
  GraduationCap 
} from 'lucide-react';

export interface RouteConfig {
  id: string;
  label: { ar: string; en: string };
  icon?: any;
  path: string; // The relative path for routing
  fullPath?: string; // Optional for Sidebar grouping cases
  element?: ReactNode;
  subItems?: RouteConfig[];
}

// --- Lazy Loading Page Components ---
const UsersPage = lazy(() => import('../../pages/Users'));
const StudentsPage = lazy(() => import('../../pages/Students'));
const TeachersPage = lazy(() => import('../../pages/Teachers'));
const ParentsPage = lazy(() => import('../../pages/Parents'));
const SessionsPage = lazy(() => import('../../pages/Sessions'));
const AgendaPage = lazy(() => import('../../pages/Agenda'));
const ExamsPage = lazy(() => import('../../pages/Exams'));
const AssignmentsPage = lazy(() => import('../../pages/Assignments'));
const SubscriptionRequestsPage = lazy(() => import('../../pages/SubscriptionRequests'));
const AllSubscriptionsPage = lazy(() => import('../../pages/AllSubscriptions'));
const PlansPage = lazy(() => import('../../pages/Plans'));
const CurrenciesPage = lazy(() => import('../../pages/Currencies'));
const ExpensesPage = lazy(() => import('../../pages/Expenses'));
const TransactionsPage = lazy(() => import('../../pages/Transactions'));
const TeacherRequestsPage = lazy(() => import('../../pages/TeacherRequests'));
const TeacherAvailabilityPage = lazy(() => import('../../pages/TeacherAvailability'));
const SubjectsPage = lazy(() => import('../../pages/Subjects'));
const LMSCoursesPage = lazy(() => import('../../pages/LMSCourses/LMSCourses'));
const SettingsPage = lazy(() => import('../../pages/Settings'));

export const dashboardRoutes: RouteConfig[] = [
  {
    id: 'dashboard',
    label: { ar: 'الرئيسية', en: 'Dashboard' },
    icon: Home,
    path: '', // Maps to /dashboard
  },
  {
    id: 'lms',
    label: { ar: 'LMS', en: 'LMS' },
    icon: PlayCircle,
    path: 'lms',
    subItems: [
      { id: 'lms-courses', label: { ar: 'الكورسات', en: 'Courses' }, path: 'lms-courses', element: <LMSCoursesPage /> }
    ]
  },
  {
    id: 'users',
    label: { ar: 'إدارة المستخدمين', en: 'User Management' },
    icon: Users,
    path: 'users',
    subItems: [
      { id: 'admins', label: { ar: 'المسؤولين', en: 'Admins' }, path: 'admins', element: <UsersPage /> },
      { id: 'students', label: { ar: 'الطلاب', en: 'Students' }, path: 'students', element: <StudentsPage /> },
      { id: 'parents', label: { ar: 'أولياء الأمور', en: 'Parents' }, path: 'parents', element: <ParentsPage /> }
    ]
  },
  {
    id: 'teachers-section',
    label: { ar: 'المعلمين', en: 'Teachers' },
    icon: GraduationCap,
    path: 'teachers-group',
    subItems: [
      { id: 'teachers', label: { ar: 'المعلمين', en: 'Teachers' }, path: 'teachers', element: <TeachersPage /> },
      { id: 'teacher-requests', label: { ar: 'طلبات المعلمين', en: 'Requests' }, path: 'teacher-requests', element: <TeacherRequestsPage /> },
      { id: 'teacher-availability', label: { ar: 'المتاحين', en: 'Available' }, path: 'teacher-availability', element: <TeacherAvailabilityPage /> },
      { id: 'subjects', label: { ar: 'المواد', en: 'Subjects' }, path: 'subjects', element: <SubjectsPage /> }
    ]
  },
  {
    id: 'content',
    label: { ar: 'المحتوى الأكاديمي', en: 'Academic Content' },
    icon: BookOpen,
    path: 'content',
    subItems: [
      { id: 'sessions', label: { ar: 'الحصص', en: 'Sessions' }, path: 'sessions', element: <SessionsPage /> },
      { id: 'agenda', label: { ar: 'الأجندة', en: 'Agenda' }, path: 'agenda', element: <AgendaPage /> },
      { id: 'exams', label: { ar: 'الامتحانات', en: 'Exams' }, path: 'exams', element: <ExamsPage /> },
      { id: 'assignments', label: { ar: 'الواجبات', en: 'Assignments' }, path: 'assignments', element: <AssignmentsPage /> }
    ]
  },
  {
    id: 'subscriptions',
    label: { ar: 'الاشتراكات', en: 'Subscriptions' },
    icon: CreditCard,
    path: 'subscriptions-group',
    subItems: [
      { id: 'subscription-requests', label: { ar: 'طلبات الاشتراك', en: 'Requests' }, path: 'subscription-requests', element: <SubscriptionRequestsPage /> },
      { id: 'all-subscriptions', label: { ar: 'كل الاشتراكات', en: 'All' }, path: 'all-subscriptions', element: <AllSubscriptionsPage /> },
      { id: 'plans', label: { ar: 'الخطط', en: 'Plans' }, path: 'plans', element: <PlansPage /> }
    ]
  },
  {
    id: 'finance',
    label: { ar: 'الماليات', en: 'Finance' },
    icon: DollarSign,
    path: 'finance-group',
    subItems: [
      { id: 'currencies', label: { ar: 'العملات', en: 'Currencies' }, path: 'currencies', element: <CurrenciesPage /> },
      { id: 'expenses', label: { ar: 'المصروفات', en: 'Expenses' }, path: 'expenses', element: <ExpensesPage /> },
      { id: 'transactions', label: { ar: 'المعاملات', en: 'Transactions' }, path: 'transactions', element: <TransactionsPage /> }
    ]
  },
  {
    id: 'settings',
    label: { ar: 'الإعدادات', en: 'Settings' },
    icon: Settings,
    path: 'settings',
    element: <SettingsPage />
  }
];
