export type ScheduleType = 'full' | 'session' | 'exam';

export interface CreateSchedulePayload {
    studentId: string;
    teacherId: string;
    subject_id: string;
    title: string;
    description: string;
    link: string;
    notes: string;
    start_time: string;
    type: ScheduleType;
    notification_Time: string;
}

export interface UpdateSchedulePayload {
    title: string;
    description: string;
    link: string;
    notes: string;
    status: string;
    start_time: string;
    type: ScheduleType;
    notification_Time: string;
}
export type DayOfWeek =
    | 'Saturday'
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday';

export interface CreateRecurringSchedulePayload {
    studentId: string;
    teacherId: string;
    subject_id: string;
    title: string;
    description: string;
    link: string;
    notes: string;
    startTime: string;
    days: DayOfWeek[];
    startDate: string;
    endDate: string;
    notification_Time: string;
    type: 'full' | 'session' | 'exam';
}