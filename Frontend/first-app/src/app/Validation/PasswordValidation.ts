import { z } from "zod";

export const setPasswordSchema = z.object({
    newPass: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPass: z.string(),
 }).refine(
  (data) => data.newPass === data.confirmPass,
  { message: "Passwords do not match", path: ["confirmPass"] }
);

export type SetPasswordSchema = z.infer<typeof setPasswordSchema>;
