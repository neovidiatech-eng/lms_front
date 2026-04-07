import z from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  category: z.string().min(1, "يرجى اختيار القسم"),
  levelId: z.number().min(1, "يرجى اختيار المستوى"),
  attachments: z.array(z.any()), 
  
  description: z.string(),
  videoUrl: z.string(),
  thumbnailFile: z.any().nullable(),
  thumbnailPreview: z.string(),
});

export type CourseFormData = z.infer<typeof courseSchema>;