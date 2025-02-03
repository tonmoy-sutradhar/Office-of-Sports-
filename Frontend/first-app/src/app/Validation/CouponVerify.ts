import { z } from "zod";

export const couponSchema = z.object({
  couponCode: z
    .string({ message: "Coupon Must be a String" })
    .nonempty({ message: "Coupon Cannot be Empty" })
});

export type CouponSchema = z.infer<typeof couponSchema>;