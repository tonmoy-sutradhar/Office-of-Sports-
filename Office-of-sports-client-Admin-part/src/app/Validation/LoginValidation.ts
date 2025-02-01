import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email Cannot be Empty" })
    .email({ message: "Enter a Valid Email Address" }),
  password: z
    .string()
    .nonempty({ message: "Password Cannot be Empty" })
    .min(6, { message: "Password Must be at Least 6 Characters Long" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
