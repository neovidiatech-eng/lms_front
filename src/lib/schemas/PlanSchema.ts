import z from "zod";

export const planSchema = z.object({
  name: z.string().min(1, 'Name (Arabic) is required'),
  nameEn: z.string().min(1, 'Name (English) is required'),
  description: z.string().min(1, 'Description is required'),

  price: z.coerce.number().min(0, 'Price must be >= 0'),

  currency: z.enum(['EGP', 'USD', 'EUR', 'GBP', 'SAR', 'AED', 'KWD', 'QAR']),

  duration: z.coerce.number().min(1, 'Duration must be at least 1 month'),

  sessionsCount: z.coerce.number().min(0),

features: z.array(z.string().min(1)),

  isPopular: z.boolean(),

  status: z.enum(['active', 'inactive']),
});

export type PlanFormData = z.infer<typeof planSchema>;