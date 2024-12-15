import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // Search for a student by email or university ID
  @Get('student')
  async searchStudent(
    @Query('query') query: string,
    @Query('adminId') adminId?: number, // Optional adminId to track who made the search
  ) {
    return this.searchService.searchStudent(query, adminId);
  }

  // Ban or unban a student by email or university_id
  @Patch('student/:identifier/ban')
  @HttpCode(HttpStatus.OK)
  async banUnbanStudent(
    @Param('identifier') identifier: string, // This can be either email or university_id
    @Body('banStatus') banStatus: boolean, // true to ban, false to unban
  ) {
    return this.searchService.banUnbanStudent(identifier, banStatus);
  }
}
