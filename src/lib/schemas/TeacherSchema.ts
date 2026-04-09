import { z } from 'zod';

type TFunc = (key: string, options?: any) => string;

export const getTeacherSchema = (t: TFunc) => z.object({
  name: z.string().min(3, t("validation.min", { count: 3 })),
  email: z.string().email(t("validation.email")),
  phone: z.string().min(8, t("validation.min", { count: 8 })),
  
  password: z.string().optional().refine((val) => !val || val.length >= 6, {
    message: t("validation.min", { count: 6 }),
  }),

  hourlyRate: z.coerce.number().min(0, t("validation.required")),
  
  currency: z.string().min(1, t("validation.required")),
  gender: z.enum(['male', 'female'], {
    required_error: t("validation.required"),
    invalid_type_error: t("validation.required"),
  }),
  status: z.enum(['active', 'inactive']),

  subjects: z.object({
    quran: z.boolean().default(false),
    math: z.boolean().default(false),
    arabic: z.boolean().default(false),
    math2: z.boolean().default(false),
    science: z.boolean().default(false),
  }).refine((data) => Object.values(data).some(val => val === true), {
    message: t("validation.required"), // Or a more specific 'please select at least one subject'
  }),
});

export type TeacherFormData = z.infer<ReturnType<typeof getTeacherSchema>>;