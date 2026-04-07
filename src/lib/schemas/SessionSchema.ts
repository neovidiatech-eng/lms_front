import { z } from 'zod';

const baseSession = z.object({
  student: z.string().min(1, { message: 'يجب اختيار الطالب' }),
  teacher: z.string().min(1, { message: 'يجب اختيار المعلم' }),
  subject: z.string().min(1, { message: 'يجب اختيار المادة' }),
  title: z.string().min(3, { message: 'العنوان يجب أن يكون 3 أحرف على الأقل' }),
  meetingLink: z.string().url({ message: 'رابط غير صحيح' }).optional().or(z.literal('')),
  notes: z.string().optional(),
});
// single session
export const sessionSchema = baseSession.extend({
  sessionDate: z.string().min(1, { message: 'يجب تحديد التاريخ' }),
  duration: z.string().min(1, { message: 'يجب اختيار مدة الحصة' }),
  startTime: z.string().min(1, { message: 'وقت البداية مطلوب' }),
  endTime: z.string().min(1, { message: 'وقت النهاية مطلوب' }),
}).refine((data) => data.endTime > data.startTime, {
  message: "وقت النهاية يجب أن يكون بعد وقت البداية",
  path: ["endTime"],
});


// multiple sessions
export const multipleSessionsSchema = baseSession.extend({
  monthYear: z.string().min(1, { message: 'يجب اختيار الشهر والسنة' }),
  duration: z.string().min(1, { message: 'يجب تحديد مدة الحصة' }),
});

export type SessionFormData = z.infer<typeof sessionSchema>;
export type MultipleSessionsFormData = z.infer<typeof multipleSessionsSchema>;

export interface MultipleSessionsPayload {
  formData: MultipleSessionsFormData;
  sessions: Array<{
    date: string;
    day: string;
    time: string;
  }>;
}