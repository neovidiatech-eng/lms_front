import React, { lazy } from 'react';
import { 
  BarChart3, 
  BookOpen,
  FileText,
  User,
  MessageSquare,
  Send,
  Users
} from 'lucide-react';

export interface TeacherRouteConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  element?: React.ReactNode;
  subItems?: {
    id: string;
    label: string;
    path: string;
    element: React.ReactNode;
  }[];
}

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

export const teacherDashboardRoutes: TeacherRouteConfig[] = [
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
    id: 'academic-content',
    label: 'sidebar_academic_content',
    icon: FileText,
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
