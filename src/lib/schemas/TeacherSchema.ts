import { z } from 'zod';

export const teacherSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
  
  password: z.string().optional().refine((val) => !val || val.length >= 6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
  }),

  hourlyRate: z.coerce.number().min(0, "سعر الساعة لا يمكن أن يكون سالباً"),
  
  currency: z.string().min(1, "العملة مطلوبة"),
  gender: z.enum(['male', 'female'], {
  message: "يرجى اختيار الجنس",
}),
  status: z.enum(['active', 'inactive']),

  subjects: z.object({
    quran: z.boolean().default(false),
    math: z.boolean().default(false),
    arabic: z.boolean().default(false),
    math2: z.boolean().default(false),
    science: z.boolean().default(false),
  }).refine((data) => Object.values(data).some(val => val === true), {
    message: "يجب اختيار مادة واحدة على الأقل",
  }),
});

export type TeacherFormData = z.infer<typeof teacherSchema>;