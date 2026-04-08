import { z } from 'zod';

export const subjectSchema = z.object({
  name_ar: z.string().min(2, { message: 'الاسم العربي يجب أن يكون حرفين على الأقل' }),
  name_en: z.string().min(2, { message: 'English name must be at least 2 characters' }).optional().or(z.literal('')),
  active: z.boolean().default(true),
  color: z.string().default('green'),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;