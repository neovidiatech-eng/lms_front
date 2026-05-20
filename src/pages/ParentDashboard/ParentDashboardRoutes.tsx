import { lazy, ReactNode } from 'react';
import {
  Play,
  FileText,
  ClipboardList,

} from 'lucide-react';

export interface ParentRouteConfig {
  id: string;
  label: string;
  icon?: any;
  path: string;
  fullPath?: string;
  element?: ReactNode;
  subItems?: ParentRouteConfig[];
}

// --- Lazy Loading Page Components for Student from Features ---
const SessionsPage = lazy(() => import('../../features/parent/pages/Sessions'));
const ExamsPage = lazy(() => import('../../features/parent/pages/Exams'));
const AssignmentsPage = lazy(() => import('../../features/parent/pages/Assignments'));

export const parentDashboardRoutes: ParentRouteConfig[] = [


      {
        id: 'student-sessions',
        label: 'sidebar_sessions',
        icon: Play,
        path: 'sessions',
        element: <SessionsPage />,
      },
      {
        id: 'student-exams',
        label: 'sidebar_exams',
        icon: FileText,
        path: 'exams',
        element: <ExamsPage />,
      },
      {
        id: 'student-assignments',
        label: 'sidebar_assignments',
        icon: ClipboardList,
        path: 'assignments',
        element: <AssignmentsPage />,
      },
    ]
