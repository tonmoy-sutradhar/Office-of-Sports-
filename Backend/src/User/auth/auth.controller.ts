import { Controller,Res,Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentDTO } from '../studentDTO/studentdto.dto';
import { ValidateDTO } from '../studentDTO/studentdto.dto';
import { Response } from 'express';
import { sendEmailDto,verifyOtp } from '../studentDTO/studentdto.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService){}

    @Post('register')
    async register(@Body()createdto:CreateStudentDTO):Promise<any>{
        return this.AuthService.register(createdto);
    }

    @Post('login')
    login(@Body() validator: ValidateDTO,@Res({passthrough:true})response: Response ): Promise<any>{
        return this.AuthService.login(validator,response);
    }

    @Post('forget-password')
    async forgetPassword(@Body()data:sendEmailDto,@Req()req:any):Promise<any>{
       await this.AuthService.forgetPassword(data,req);
       return {message:"An OTP has been send to your registered email"};
    }

    @Post('verify-otp')
    verifyOTP(@Body() otp: verifyOtp, @Req()req:any):Promise<any> {
    return this.AuthService.verifyOTP(otp, req);
    }

}
