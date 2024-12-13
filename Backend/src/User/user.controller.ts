import { Controller,Post,Get,Body,Req } from '@nestjs/common';
import { UserService } from './user.service';
import { sendEmailDto,verifyOtp } from './studentDTO/studentdto.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('forget-password')
    async forgetPassword(@Body()data:sendEmailDto,@Req()req:any){
    await this.userService.forgetPassword(data,req);
    return {message:"An OTP has been sent to your registered Email."}
  }

  @Post('verify-otp')
  async verifyOtp(@Body() otp: verifyOtp, @Req()req:any) {
  return await this.userService.verifyOtp(otp, req);
  }

}
