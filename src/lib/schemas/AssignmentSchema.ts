import { z } from 'zod';

export const assignmentSchema = z.object({
  studentName: z.string().min(3, { message: 'اسم الطالب يجب أن يكون 3 أحرف على الأقل' }),
  teacher: z.string().min(3, { message: 'اسم المعلم مطلوب' }),
  subject: z.string().min(2, { message: 'المادة مطلوبة' }),
  title: z.string().min(3, { message: 'عنوان الواجب مطلوب' }),
  description: z.string().min(5, { message: 'الوصف يجب أن يكون مفصلاً' }),
  dueDate: z.string().min(1, { message: 'تاريخ التسليم مطلوب' }),
  status: z.enum(['pending', 'submitted', 'graded']),
});

export type AssignmentFormData = z.infer<typeof assignmentSchema>;