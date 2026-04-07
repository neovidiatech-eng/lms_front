import * as z from "zod";

export const ExpenseCategoryEnum = z.enum([
  'salaries', 
  'utilities', 
  'supplies', 
  'marketing', 
  'general', 
  'administrative', 
  'other'
]);

export const ExpenseStatusEnum = z.enum(['paid', 'pending']);

export const expenseSchema = z.object({
  description: z
    .string()
    .min(3, { ar: "الوصف يجب أن يكون 3 أحرف على الأقل", en: "Description must be at least 3 characters" }[ 'ar' ]) // يمكنك تخصيص الرسالة حسب اللغة
    .max(200),
    
  amount: z.coerce
    .number()
    .positive("المبلغ يجب أن يكون أكبر من صفر")
    .min(0.01),
    
  currency: z.string().min(1, "العملة مطلوبة"),
  
  category: ExpenseCategoryEnum,
  
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "تاريخ غير صالح",
  }),
  
  paymentMethod: z.string().optional().or(z.literal('')),
  
  status: ExpenseStatusEnum.default('pending'),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

export interface Expense extends ExpenseFormData {
  id: string;
  createdAt?: string;
}