import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './Sports_Entity/sports.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';
import { SportsController } from './sports.controller'; // Make sure this is imported

@Module({
  imports: [TypeOrmModule.forFeature([Sport, Slot, Feedback])],
  providers: [SportsService],
  exports: [SportsService], // Export this file for used in other modules
  controllers: [SportsController], // Ensure the controller is added here
})
export class SportsModule {}
