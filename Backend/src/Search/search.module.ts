import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Main_StudentDB } from 'src/auth/Student_Entity/Maindb.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Main_StudentDB,Slot,Booking,Feedback])],
  providers: [SearchService]
})
export class SearchModule {}
