import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  countryCode: z.string().min(1, 'رمز الدولة مطلوب'),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number (e.g. 01012345678)'),
  gender: z.string().min(1, 'يرجى اختيار الجنس'),
  birthDate: z.string().optional().or(z.literal('')),
  plan: z.string().optional().or(z.literal('')),
  country: z.string().min(1, 'يرجى اختيار الدولة'),
  status: z.enum(['active', 'inactive']),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').optional().or(z.literal('')),
});

export type StudentFormData = z.infer<typeof studentSchema>;