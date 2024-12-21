import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './Feedback_Entity/feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Slot,Feedback, Sport, Student_Regi])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
