// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Sport } from './Sports_Entity/sports.entity';
// import { Repository } from 'typeorm';
// import { Sport } from 'src/sports/Sports_Entity/sports.entity';

// @Injectable()
// export class SportsService {
//   constructor(@InjectRepository(Sport)
// private readonly sportRepository: Repository<Sport>,){}

// async addSport(createSportDto: CreateSportDto): Promise<Sport>{
//   const sport = this.sportRepository.create(createSportDto)
//   return this.sportRepository.save(sport)
// }
// }

// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Sport } from './Sports_Entity/sports.entity';
// import { CreateSportDto } from './create-sport.dto';

// @Injectable()
// export class SportsService {
//   constructor(
//     @InjectRepository(Sport)
//     private readonly sportRepository: Repository<Sport>,
//   ) {}

//   async addSport(createSportDto: CreateSportDto): Promise<Sport> {
//     const sport = this.sportRepository.create(createSportDto);
//     return this.sportRepository.save(sport);
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sport } from './Sports_Entity/sports.entity';
import { CreateSportDto } from './create-sport.dto';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  // Add a new sport
  async addSport(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportRepository.create({
      ...createSportDto,
      type: createSportDto.type.toLowerCase() as 'outdoor' | 'indoor',
    });

    return await this.sportRepository.save(sport);
  }
}
