import { z } from 'zod';

type TFunc = (key: string, options?: any) => string;

export const getRoleSchema = (t: TFunc) => z.object({
  name: z.string().min(3, t("validation.min", { count: 3 })),
  description: z.string().min(5, t("validation.min", { count: 5 })),
  permissions: z.array(z.string()).min(1, t("validation.required")),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type RoleFormData = z.infer<ReturnType<typeof getRoleSchema>>;
