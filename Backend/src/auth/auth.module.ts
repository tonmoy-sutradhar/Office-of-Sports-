import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student_Regi } from './Student_Entity/student.entity';
import { Main_StudentDB } from './Student_Entity/Maindb.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Main_StudentDB,Student_Regi])],
  controllers:[AuthController],
  providers: [AuthService]
})
export class AuthModule {}
