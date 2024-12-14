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

  // Add a new sport with error handling
  async addSport(createSportDto: CreateSportDto): Promise<Sport> {
    const sport = this.sportRepository.create({
      ...createSportDto,
      type: createSportDto.type.toLowerCase() as 'outdoor' | 'indoor',
    });

    try {
      return await this.sportRepository.save(sport);
    } catch (error) {
      // Log error and throw a user-friendly message
      console.error('Error saving sport:', error);
      throw new Error('Error creating sport. Please try again later.');
    }
  }
}
