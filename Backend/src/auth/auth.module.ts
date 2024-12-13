import { Module } from '@nestjs/common';
import { AuthService } from 'src/User/auth/auth.service';
import { AuthController } from 'src/User/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Main_StudentDB } from 'src/User/Student_Entity/Maindb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Main_StudentDB, Student_Regi])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
