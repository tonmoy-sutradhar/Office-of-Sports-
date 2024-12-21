import { Controller,Res,Post, Body, Req, Patch, UsePipes, ValidationPipe,UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentDTO, resetPassDTO } from '../studentDTO/studentdto.dto';
import { ValidateDTO } from '../studentDTO/studentdto.dto';
import { sendEmailDto,verifyOtp } from '../studentDTO/studentdto.dto';
import { Response } from 'express';
import { userAuthGuard } from './userAuth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService,
    ){}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body()createdto:CreateStudentDTO):Promise<any>{
        return this.AuthService.register(createdto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() validator: ValidateDTO,@Res({passthrough:true})res:Response): Promise<any>{
        return this.AuthService.login(validator,res);
    }

    @Post('logout')
    @UseGuards(userAuthGuard)
    async logout(@Req() request:any, @Res({ passthrough: true }) response:any): Promise<{ message: string }> {
        return await this.AuthService.logout(request, response);
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

    @Patch('reset-password')
    @UseGuards(userAuthGuard)
     resetPass(@Body()userdata:resetPassDTO,@Req()rq:any){
        return this.AuthService.resetPass(userdata,rq); 
    }

    
}
