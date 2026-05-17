import { z } from "zod";

type TFunc = (key: string, options?: any) => string;

export const getExpenseCategoryEnum = () => z.enum([
  'salary',
  'amenities',
  'general',
  'management',
  'marketing',
  'other'
]);

export const getExpenseStatusEnum = () => z.enum(['paid', 'pending', 'failed']);

export const getExpenseSchema = (t: TFunc) => z.object({
  title: z
    .string()
    .min(3, t("validation.min", { count: 3 }))
    .max(200, t("validation.max", { count: 200 })),

  amount: z.coerce
    .number()
    .min(0.01, t("validation.required")),

  currencyId: z.string().min(1, t("validation.required")),

  type: getExpenseCategoryEnum(),

  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: t("validation.required"),
  }),

  payment_type: z.string().min(1, t("validation.required")),

  status: getExpenseStatusEnum().default('pending'),
});

export type ExpenseFormData = z.infer<ReturnType<typeof getExpenseSchema>>;

export interface Expense extends ExpenseFormData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  currency?: {
    id: string;
    name_en: string;
    name_ar: string;
    symbol: string;
    code: string;
  };
}