import { lazy } from 'react';
import {
  BarChart3,
  BookOpen,
  FileText,
  User,
  MessageSquare,
  Send,
  Users,
  Clock
} from 'lucide-react';
import { RouteConfig } from '../../components/constants/dashboardRoutes';

// Reuse dashboard components for content viewing
const DashboardOverview = lazy(() => import('./TeacherDashboardHome'));
const ProfilePage = lazy(() => import('./TeacherProfile'));
const LMSCoursesPage = lazy(() => import('../../pages/LMSCourses/LMSCourses'));
const SessionsPage = lazy(() => import('../../pages/Sessions'));
const AgendaPage = lazy(() => import('../../pages/Agenda'));
const ExamsPage = lazy(() => import('../../pages/Exams'));
const AssignmentsPage = lazy(() => import('../../pages/Assignments'));
const StudentsPage = lazy(() => import('./TeacherStudents'));
const ChatPage = lazy(() => import('./TeacherChat'));
const RequestsPage = lazy(() => import('./TeacherRequests'));
const AvailabilityPage = lazy(() => import('../../pages/TeacherAvailability'));

export const teacherDashboardRoutes: RouteConfig[] = [
  {
    id: 'dashboard',
    label: 'sidebar_dashboard',
    icon: BarChart3,
    path: '',
    element: <DashboardOverview />,
  },
  {
    id: 'lms',
    label: 'sidebar_lms',
    icon: BookOpen,
    path: 'courses',
    element: <LMSCoursesPage />,
  },
  {
    id: 'teacher-availability',
    label: 'sidebar_available',
    icon: Clock,
    path: 'availability',
    element: <AvailabilityPage />,
  },
  {
    id: 'academic-content',
    label: 'sidebar_academic_content',
    icon: FileText,
    path: 'content',
    subItems: [
      {
        id: 'sessions',
        label: 'sidebar_sessions',
        path: 'sessions',
        element: <SessionsPage />
      },
      {
        id: 'agenda',
        label: 'sidebar_agenda',
        path: 'agenda',
        element: <AgendaPage />
      },
      {
        id: 'exams',
        label: 'sidebar_exams',
        path: 'exams',
        element: <ExamsPage />
      },
      {
        id: 'assignments',
        label: 'sidebar_assignments',
        path: 'assignments',
        element: <AssignmentsPage />
      }
    ]
  },
  {
    id: 'teacher-students',
    label: 'sidebar_students',
    icon: Users,
    path: 'students',
    element: <StudentsPage />,
  },
  {
    id: 'teacher-chat',
    label: 'sidebar_chat',
    icon: MessageSquare,
    path: 'chat',
    element: <ChatPage />,
  },
  {
    id: 'teacher-requests',
    label: 'sidebar_teacher_requests',
    icon: Send,
    path: 'requests',
    element: <RequestsPage />,
  },
  {
    id: 'teacher-profile',
    label: 'sidebar_profile',
    icon: User,
    path: 'profile',
    element: <ProfilePage />,
  },
];
