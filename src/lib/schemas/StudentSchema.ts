import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('بريد إلكتروني غير صحيح'),
  countryCode: z.string().min(1, 'رمز الدولة مطلوب'),
  phone: z.string().min(7, 'رقم الهاتف قصير جداً').max(15, 'رقم الهاتف طويل جداً'),
  gender: z.string().min(1, 'يرجى اختيار الجنس'),
  birthDate: z.string().optional().or(z.literal('')), 
  plan: z.string().optional().or(z.literal('')),
  country: z.string().min(1, 'يرجى اختيار الدولة'),
  status: z.enum(['active', 'inactive']),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  const { countryCode, phone } = data;

  if (countryCode === '+20') {
    // Egypt: 01 followed by 0/1/2/5 then 8 digits
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'يرجى إدخال رقم هاتف مصري صحيح (مثلاً 01012345678)',
        path: ['phone'],
      });
    }
  } else if (countryCode === '+966') {
    // Saudi Arabia: 05 followed by 8 digits, or 5 followed by 8 digits
    if (!/^(05|5)[0-9]{8}$/.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'يرجى إدخال رقم هاتف سعودي صحيح (مثلاً 0512345678)',
        path: ['phone'],
      });
    }
  } else if (countryCode === '+971') {
    // UAE: 05 followed by 0/2/4/5/6/8 then 7 digits (also allowing without 0)
    if (!/^(05|5)[024568][0-9]{7}$/.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'يرجى إدخال رقم هاتف إماراتي صحيح (مثلاً 0501234567)',
        path: ['phone'],
      });
    }
  } else if (countryCode === '+965') {
    // Kuwait: 8 digits starting with 5, 6, or 9
    if (!/^[569][0-9]{7}$/.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'يرجى إدخال رقم هاتف كويتي صحيح (8 أرقام تبدأ بـ 5 أو 6 أو 9)',
        path: ['phone'],
      });
    }
  } else {
    // Generic validation for other codes
    if (!/^[0-9]+$/.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'يرجى إدخال أرقام فقط',
        path: ['phone'],
      });
    }
  }
});

export type StudentFormData = z.infer<typeof studentSchema>;