import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './Sports_Entity/sports.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sport,Slot,Feedback])],
  providers: [SportsService]
})
export class SportsModule {}
