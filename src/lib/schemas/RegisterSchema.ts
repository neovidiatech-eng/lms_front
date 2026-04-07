import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  codeCountry: z.string().min(1, { message: "Country code is required" }),
  phone: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain digits only" }),


  birth_date: z
    .string()
    .refine((val) => val !== "", { message: "Birth date is required" }),
  gender: z
    .string()
    .nonempty({ message: "Please select gender" }),
  country: z
    .string()
    .nonempty({ message: "Please select country" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  plan_id: z
    .string()
    .nonempty({ message: "Please select a package to verify" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
