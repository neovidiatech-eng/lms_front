export interface StudentDashboardResponse {
  message: string;
  status: number;
  lang: string;
  data: StudentDashboardData;
}

export interface StudentDashboardData {
  student: Student;
  stats: StudentStats;
  todaySchedules: TodaySchedule[];
}

export interface Student {
  id: string;
  user_id: string;
  name: string;
  email: string;
  active: boolean;
  gender: string;
  birth_date: string;
  country: string;
  status: string;
  plan: StudentPlan;
}

export interface StudentPlan {
  id: string;
  name_en: string;
  name_ar: string;
}

export interface StudentStats {
  sessions: SessionsStats;
  homeworks: HomeworkStats;
  exams: ExamsStats;
  courses: CoursesStats;
}

export interface SessionsStats {
  total: number;
  attended: number;
  remaining: number;
  scheduled: number;
}

export interface HomeworkStats {
  total: number;
  pending: number;
}

export interface ExamsStats {
  total: number;
  pending: number;
}

export interface CoursesStats {
  total: number;
}

export interface TodaySchedule {
  id: string;
  teacherId: string;
  studentId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
  description: string;
  link: string;
  title: string;
  end_time: string;
  start_time: string;
  day_of_week: string | null;
  is_recurring: boolean;
  parent_recurring_id: string | null;
  subjectId: string;
  rescheduledFromId: string | null;
  rescheduledToId: string | null;
  teacher: Teacher;
  subject: Subject;
}

export interface Teacher {
  id: string;
  user_id: string;
  currencyId: string;
  hour_price: number;
  meeting_link: string;
  gender: string;
  active: boolean;
  roleId: string | null;
  createdAt: string;
  updatedAt: string;
  avgRating: number;
  totalReviews: number;
  user: TeacherUser;
}

export interface TeacherUser {
  id: string;
  name: string;
  email: string;
}

export interface Subject {
  id: string;
  name_en: string;
  name_ar: string;
  active: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}