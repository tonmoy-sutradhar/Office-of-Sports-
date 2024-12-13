import { Controller,Res,Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentDTO } from '../studentDTO/studentdto.dto';
import { ValidateDTO } from '../studentDTO/studentdto.dto';
import { Response } from 'express';

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

}
