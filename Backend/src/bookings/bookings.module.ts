import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './Booking_Entity/booking.entity'; // Import the Booking entity
import { BookingsService } from './bookings.service'; // Import the BookingsService
import { BookingsController } from './bookings.controller'; // Import the BookingsController
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { NotificationService } from 'src/notifications/notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Slot, Sport, Student_Regi])],
  providers: [BookingsService,NotificationService], // Ensure BookingsService is available in the module
  controllers: [BookingsController], // Ensure BookingsController is included in the module
})
export class BookingsModule {}
