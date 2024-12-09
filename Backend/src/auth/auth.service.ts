import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student_Regi } from './Student_Entity/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './studentDTO/studentdto.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Student_Regi) private authRepo: Repository<Student_Regi>){}

    async register(createdto:CreateStudentDTO): Promise<Student_Regi>{
       const value = this.authRepo.create(createdto);
        return await this.authRepo.save(value);
    }

}
