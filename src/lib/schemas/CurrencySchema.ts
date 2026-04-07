import { z } from 'zod';

export const CurrencySchema = z.object({
  name_ar: z.string().min(1, 'الاسم بالعربية مطلوب'),
  name_en: z.string().min(1, 'English name is required'),
  symbol: z.string().min(1, 'الرمز مطلوب'),
  code: z.string().min(1, 'الكود مطلوب'),
  default: z.boolean().default(false),
  exchangeRate: z.coerce.number().min(0, 'سعر الصرف يجب أن يكون رقماً موجباً'),
});

export type CurrencyFormData = z.infer<typeof CurrencySchema>;