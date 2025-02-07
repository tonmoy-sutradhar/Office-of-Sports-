import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email Cannot be Empty" })
    .email({ message: "Enter a Valid Email Address" })
    .regex(/^\d{2}-\d{5}-\d{1}@student\.aiub\.edu$/, 'Invalid email format. The email must be AIUB-provided email.'),
});

export type EmailSchema = z.infer<typeof emailSchema>;
