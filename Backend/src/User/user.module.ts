import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Student_Regi } from './Student_Entity/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
//import { useContainer } from 'class-validator';
import { UserController } from './user.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Student_Regi])],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports : [UserService]
})
export class UserModule {}
