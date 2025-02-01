import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email Cannot be Empty" })
    .email({ message: "Enter a Valid Email Address" }),
});

export type EmailSchema = z.infer<typeof emailSchema>;
