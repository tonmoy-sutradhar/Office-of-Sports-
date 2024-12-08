import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Main_StudentDB } from 'src/auth/Student_Entity/Maindb.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Main_StudentDB])],
  providers: [ProfileService]
})
export class ProfileModule {}
