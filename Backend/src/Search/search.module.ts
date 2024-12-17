import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { SearchController } from './search.controller';
import { Search } from './Search_history Entity/search.entity';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student_Regi, Search]), AdminModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
