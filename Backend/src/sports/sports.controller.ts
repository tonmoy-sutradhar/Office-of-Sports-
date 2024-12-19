import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './create-sport.dto';
import { adminAuthGuard } from 'src/admin/adminGuard.guard';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Post()
  //@UseGuards(adminAuthGuard)
  async addSport(@Body() createSportDto: CreateSportDto) {
    return this.sportsService.addSport(createSportDto);
  }

  // Get all sports
  @Get()
  async getAllSports() {
    return this.sportsService.getAllSports();
  }

  // Get a specific sport by ID
  @Get(':id')
  async getSportById(@Param('id') id: number) {
    return this.sportsService.getSportById(id);
  }
}
