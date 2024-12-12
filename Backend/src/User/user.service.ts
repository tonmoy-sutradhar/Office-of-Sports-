import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student_Regi } from './Student_Entity/student.entity';
import { CreateStudentDTO, ValidateDTO } from './studentDTO/studentdto.dto';
import { Repository } from 'typeorm';
//import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
    constructor(@InjectRepository(Student_Regi) private userRepo : Repository<Student_Regi>){}

    async registerUser(createdto:CreateStudentDTO): Promise<any>{
        const {password, ...response} = await this.userRepo.save(createdto);
        return response;
    }

    async userLogin(logindata:ValidateDTO): Promise<any>{
        return await this.userRepo.findOneBy({email: logindata.email});
    }
}
