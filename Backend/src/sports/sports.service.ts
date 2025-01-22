import { BadGatewayException, Injectable , ConflictException } from '@nestjs/common';
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
    const existingSport = await this.sportRepository.findOne({
      where: { name: createSportDto.name },
    });
  
    if (existingSport) {
      throw new ConflictException('Sport already exists.');
    }
  
    // Create a new sport
    const sport = this.sportRepository.create({
      ...createSportDto,
      type: createSportDto.type.toLowerCase() as 'outdoor' | 'indoor',
    });

    return this.sportRepository.save(sport);
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
