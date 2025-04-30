import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Booking } from '../bookings/Booking_Entity/booking.entity';
import { Slot } from '../Slots/Slot_Entity/slot.entity'; // Import the Slot entity
import { Student_Regi } from '../User/Student_Entity/student.entity';
import { Coupon } from './Coupon_Entity/Coupon.entity'; // Import the Coupon entity
import { NotificationService } from '../notifications/notifications.service';
import { Sport } from '../sports/Sports_Entity/sports.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sport,Booking, Student_Regi, Slot, Coupon]), // Added Coupon entity
  ],
  providers: [PaymentService,NotificationService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
