import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { SearchService } from './search.service';
import { adminAuthGuard } from 'src/admin/adminGuard.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // Search for a student by university ID
  @Get('student')
  @UseGuards(adminAuthGuard)
  async searchStudent(
    @Query('query') query: string,
    @Query('adminId') adminId?: number,
  ) {
    return this.searchService.searchStudent(query, adminId);
  }

  // Get all students
  @Get('students')
  @UseGuards(adminAuthGuard)
  async getAllStudents() {
    return this.searchService.getAllStudents();
  }

  // Ban or unban a student by university_id
  @Patch('student/ban/:identifier')
  @UseGuards(adminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async banUnbanStudent(
    @Param('identifier') identifier: string,
    @Body('banStatus') banStatus: boolean,
  ) {
    return this.searchService.banUnbanStudent(identifier, banStatus);
  }
}
