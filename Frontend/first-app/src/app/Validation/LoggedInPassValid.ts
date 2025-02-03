import { z } from "zod";

export const setPasswordlSchema = z.object({
    oldPass: z
    .string()
    .nonempty({ message: "Old password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),

    newPass: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPass: z.string(),
 }).refine(
  (data) => data.newPass === data.confirmPass,
  { message: "Passwords do not match", path: ["confirmPass"] }
);

export type SetPasswordlSchema = z.infer<typeof setPasswordlSchema>;
