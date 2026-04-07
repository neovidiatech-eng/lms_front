import { z } from 'zod';

export const parentSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),
  email: z.string().email("بريد غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  username: z.string().min(5, "اسم المستخدم مطلوب"),
  password: z.string().min(6, "كلمة المرور مطلوبة"),
numberOfChildren: z.coerce.number().min(0),
  studentNames: z.array(z.string()).min(1, "اختر طالباً واحداً على الأقل")
});

// استخراج النوع لاستخدامه في المودال
export type ParentFormData = z.infer<typeof parentSchema>;