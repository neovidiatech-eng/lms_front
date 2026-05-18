import { z } from "zod";

type TFunc = (key: string, options?: any) => string;

export const getCourseSchema = (t: TFunc) => z.object({
  title: z.string().min(3, t("validation.min", { count: 3 })),
  category: z.string().min(1, t("validation.required")),
  attachments: z.array(z.any()).optional(),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
  thumbnailFile: z.any().nullable(),
  thumbnailPreview: z.string().optional(),
});

export type CourseFormData = z.infer<ReturnType<typeof getCourseSchema>>;