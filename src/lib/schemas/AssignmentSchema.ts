import { z } from 'zod';

type TFunc = (key: string, options?: any) => string;

export const getAssignmentSchema = (t: TFunc) => z.object({
  studentName: z.string().min(3, t("validation.min", { count: 3 })),
  teacher: z.string().min(3, t("validation.min", { count: 3 })),
  subject: z.string().min(2, t("validation.min", { count: 2 })),
  title: z.string().min(3, t("validation.min", { count: 3 })),
  description: z.string().min(5, t("validation.min", { count: 5 })),
  dueDate: z.string().min(1, t("validation.required")),
  status: z.enum(['pending', 'submitted', 'graded']),
});

export type AssignmentFormData = z.infer<ReturnType<typeof getAssignmentSchema>>;