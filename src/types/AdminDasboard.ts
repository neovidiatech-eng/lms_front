export interface DashboardResponse {
  message: string;
  status: number;
  lang: string;
  data: DashboardData;
}

export interface DashboardData {
  stats: Stats;
  sessionsPerDay: SessionPerDay[];
  upcomingSessions: UpcomingSession[];
  activityFeed: ActivityFeedItem[];
  activeUsers: ActiveUsers;
}

export interface Stats {
  totalStudents: number;
  totalTeachers: number;
  pendingRequests: number;
  todaySessions: number;
}

export interface SessionPerDay {
  date: string;
  count: number;
}

export interface UpcomingSession {
  id: string;
  title: string;
  subject: string;
  time: string;
  teacher: string;
  student: string;
}

export interface ActivityFeedItem {
  id: string;
  type: string;
  title: string;
  time: string;
  user: string;
  avatar: string | null;
}

export interface ActiveUsers {
  students: number;
  instructors: number;
}