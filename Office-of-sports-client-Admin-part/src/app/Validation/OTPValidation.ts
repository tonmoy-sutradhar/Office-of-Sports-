import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .nonempty({ message: "OTP Cannot be Empty" })
    .min(4, { message: "OTP Must be at Least 6 Characters Long" })
    .max(4, { message: "OTP Must be at Most 6 Characters Long" })
    .regex(/^\d{4}$/, { message: "Invalid OTP format" }),
});

export type OTPSchema = z.infer<typeof otpSchema>;
