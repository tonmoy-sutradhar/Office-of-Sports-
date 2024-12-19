import { BadGatewayException, Injectable } from '@nestjs/common';
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

    if (sport.name === createSportDto.name) {
      throw new BadGatewayException('Sport already exists.');
    }
      return await this.sportRepository.save(sport);
  }

  // Fetch all sports
  async getAllSports(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  // Fetch a specific sport by ID
  async getSportById(id: number): Promise<Sport> {
    const sport = await this.sportRepository.findOne({ where: { id } });
    if (!sport) throw new Error('Sport not found.');
    return sport;
  }
}
