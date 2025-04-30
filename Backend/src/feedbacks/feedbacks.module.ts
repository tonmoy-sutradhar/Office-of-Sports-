import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './Feedback_Entity/feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { Student_Regi } from '../User/Student_Entity/student.entity';
import { Sport } from '../sports/Sports_Entity/sports.entity';
import { Slot } from '../Slots/Slot_Entity/slot.entity';
import { Booking } from '../bookings/Booking_Entity/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Slot,Feedback, Sport, Student_Regi])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
