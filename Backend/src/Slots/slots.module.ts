import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Slot } from './Slot_Entity/slot.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Slot,Sport])],
  providers: [SlotsService]
})
export class SlotsModule {}
