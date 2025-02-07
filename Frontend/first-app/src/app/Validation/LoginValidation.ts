import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email Cannot be Empty" })
    .email({ message: "Enter a Valid Email Address" })
    .regex(/^\d{2}-\d{5}-\d{1}@student\.aiub\.edu$/, 'Invalid email format. The email must be AIUB-provided email.'),
  password: z
    .string()
    .nonempty({ message: "Password Cannot be Empty" })
    .min(6, { message: "Password Must be at Least 6 Characters Long" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
