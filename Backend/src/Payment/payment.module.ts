import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity'; // Import the Slot entity
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Coupon } from './Coupon_Entity/Coupon.entity'; // Import the Coupon entity
import { NotificationService } from 'src/notifications/notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Student_Regi, Slot, Coupon]), // Added Coupon entity
  ],
  providers: [PaymentService,NotificationService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
