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

  // Search for a student by university ID
  @Get('student')
  async searchStudent(
    @Query('query') query: string,
    @Query('adminId') adminId?: number,
  ) {
    return this.searchService.searchStudent(query, adminId);
  }

  // Ban or unban a student by university_id
  @Patch('student/:identifier/ban')
  @HttpCode(HttpStatus.OK)
  async banUnbanStudent(
    @Param('identifier') identifier: string,
    @Body('banStatus') banStatus: boolean,
  ) {
    return this.searchService.banUnbanStudent(identifier, banStatus);
  }
}
