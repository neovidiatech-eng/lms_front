import * as z from "zod";

export const TransactionTypeEnum = z.enum(['income', 'teacher_expense']);
export const TransactionStatusEnum = z.enum(['completed', 'pending']);

export const transactionSchema = z.object({
  type: TransactionTypeEnum,
  
  studentName: z.string().optional().or(z.literal('')),
  
  teacherName: z
    .string()
    .min(3, { ar: "اسم المعلم يجب أن يكون 3 أحرف على الأقل", en: "Teacher name must be at least 3 characters" }[ 'ar' ]),
    
  amount: z.coerce
    .number()
    .positive("المبلغ يجب أن يكون أكبر من صفر")
    .min(0),
    
  currency: z.string().min(1, "العملة مطلوبة"),
  
  paymentMethod: z.string().optional().or(z.literal('')),
  
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "تاريخ غير صالح",
  }),
  
  status: TransactionStatusEnum.default('pending'),
  
  notes: z.string().optional().or(z.literal('')),

  sessionCount: z.coerce.number().int().positive().optional(),
  sessionDuration: z.coerce.number().positive().optional(),
  ratePerHour: z.coerce.number().positive().optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'income' && (!data.studentName || data.studentName.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "اسم الطالب مطلوب في حالة الإيرادات",
      path: ['studentName'],
    });
  }
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export interface Transaction extends TransactionFormData {
  id: string;
  createdAt?: string;
}