// lib/schemas/UserSchema.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  email: z.string().email("بريد غير صحيح"),
  countryCode: z.string(),
  phone: z.string().min(1, "الهاتف مطلوب"),
  role: z.string(),
  password: z.string().min(6),
permissions: z.array(z.string()),
});

export type UserFormData = z.infer<typeof userSchema>;