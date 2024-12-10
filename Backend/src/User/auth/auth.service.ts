import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateStudentDTO, ValidateDTO } from '../studentDTO/studentdto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; 




@Injectable()
export class AuthService {
    constructor(
        private  userService: UserService, 
        private jwtService : JwtService
    ){}

    async register(createdto:CreateStudentDTO): Promise<any>{

        const hashedPassword = await bcrypt.hash(createdto.password, 8);

        createdto.password = hashedPassword;

        return await this.userService.registerUser(createdto);
    }

    async login(loginData:ValidateDTO,response) : Promise<{message: string}>{
        const user = await this.userService.userLogin(loginData);
        if(!user){
            throw new UnauthorizedException();
        }
        const passMatch = await bcrypt.compare(loginData.password, user.password);
        if(!passMatch){
            throw new UnauthorizedException();
        }
        const payload = await this.jwtService.signAsync(loginData);
        response.cookie('Token',payload,{httpOnly:true});
        return{
            message: "Login Sucessfull",
        };
    }


}
