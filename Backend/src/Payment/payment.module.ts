import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Student_Regi } from 'src/User/Student_Entity/student.entity'; // import the Student_Regi entity
import { Slot } from 'src/Slots/Slot_Entity/slot.entity'; // import the Slot entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Student_Regi, Slot]), // Make sure Student_Regi repository is available here
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
