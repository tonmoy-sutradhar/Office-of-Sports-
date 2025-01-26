import { z } from "zod";

export const registrationSchema = z.object({
  university_id: z
    .string()
    .nonempty({ message: "Student ID Can not be Empty" })
    .regex(/^\d{2}-\d{5}-\d{1}$/, { message: "Invalid Student ID format" }),
  email: z
    .string()
    .nonempty({ message: "Email Cannot be Empty" })
    .email({ message: "Enter a Valid Email Address" }),
  password: z
    .string()
    .nonempty({ message: "Password Cannot be Empty" })
    .min(6, { message: "Password Must be at Least 6 Characters Long" }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
