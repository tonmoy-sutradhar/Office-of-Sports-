import { IsString } from "class-validator";

export class CouponDTO{
    @IsString()
    coupon:string;
}