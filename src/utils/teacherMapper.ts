import { TeacherApi } from "../services/TeacherAvailabilityServices";

export const mapTeachersToSessions = (teachers: TeacherApi[]) => {
  const sessions: any[] = [];

  teachers.forEach((teacher) => {
    teacher.schedules.forEach((s) => {
      sessions.push({
        id: s.id,
        teacherId: teacher.id,
        teacherName: teacher.user.name,
        studentName: s.studentId,
        subject: s.title,
        date: s.start_time.split("T")[0],
        time: new Date(s.start_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: new Date(s.end_time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    });
  });

  return sessions;
};
