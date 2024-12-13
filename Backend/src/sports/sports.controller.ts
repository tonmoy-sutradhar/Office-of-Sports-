// import { Body, Controller, Post } from '@nestjs/common';
// import { SportsService } from './sports.service';

// @Controller('sports')
// export class SportsController {
//   constructor(private readonly SportsService: SportsService) {}

//   @Post()
//   async addSport(@Body() createSportDto: CreateSportDto) {
//     return this.SportsService.addSport(createSportDto);
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './create-sport.dto';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Post()
  async addSport(@Body() createSportDto: CreateSportDto) {
    return this.sportsService.addSport(createSportDto);
  }
}
