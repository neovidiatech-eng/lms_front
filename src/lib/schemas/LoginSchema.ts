import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;