import z from "zod";

export const editSubscriptionSchema = z.object({
  planName: z.string().min(1, 'Plan name is required'),
  planPrice: z.string().min(1, 'Price is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  status: z.enum(['active', 'expired', 'cancelled']),
  totalSessions: z.number().min(0, 'Total sessions must be at least 0'),
  sessionsRemaining: z.number().min(0, 'Remaining sessions must be at least 0'),
}).refine(data => data.sessionsRemaining <= data.totalSessions, {
  message: "Remaining sessions cannot exceed total sessions",
  path: ["sessionsRemaining"],
});

export type EditSubscriptionFormData = z.infer<typeof editSubscriptionSchema>;
