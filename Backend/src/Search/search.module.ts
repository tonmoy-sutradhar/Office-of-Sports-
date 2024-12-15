import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student_Regi } from 'src/User/Student_Entity/student.entity'; // Student entity
import { SearchController } from './search.controller';
import { Search } from './Search_history Entity/search.entity';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student_Regi, Search]), AdminModule], // Include Search entity
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
// localhost:3000/search/student?query=tonmoy@gmail.com  -->>>for search student by email (Ban & UnBan)
// {
//   "banStatus": true
// }
// localhost:3000/search/student/55555/ban
