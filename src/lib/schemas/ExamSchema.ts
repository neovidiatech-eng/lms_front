import { z } from 'zod';

export const examSchema = z.object({
  title: z.string().min(3, 'العنوان مطلوب'),
  subject: z.string().min(1, 'المادة مطلوبة'),
  teacher: z.string().min(1, 'اسم المعلم مطلوب'),
  studentName: z.string().min(1, 'اسم الطالب مطلوب'),
  dueDate: z.string().min(1, 'التاريخ مطلوب'),

  duration: z.coerce.string().min(1, 'المدة مطلوبة'), 
  
  grade: z.coerce.number().min(0).max(1000),
  status: z.enum(['upcoming', 'completed']),
});

export type ExamFormData = z.infer<typeof examSchema>;