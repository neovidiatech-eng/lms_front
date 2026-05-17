import { z } from "zod";

type TFunc = (key: string, options?: any) => string;

export const getCourseSchema = (t: TFunc) => z.object({
  title: z.string().min(3, t("validation.min", { count: 3 })),
  category: z.string().min(1, t("validation.required")),
  levelId: z.number().min(1, t("validation.required")),
  attachments: z.array(z.any()).optional().default([]),
  description: z.string().optional().default(""),
  videoUrl: z.string().optional().default(""),
  thumbnailFile: z.any().nullable().optional(),
  thumbnailPreview: z.string().optional().default(""),
});

export type CourseFormData = z.infer<ReturnType<typeof getCourseSchema>>;