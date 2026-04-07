import { z } from 'zod';

export const subjectSchema = z.object({
  nameAr: z.string().min(2, { message: 'الاسم العربي يجب أن يكون حرفين على الأقل' }),
  nameEn: z.string().min(2, { message: 'English name must be at least 2 characters' }).optional().or(z.literal('')),
  status: z.enum(['active', 'inactive']),
  color: z.string(),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;