import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Booking])],
  providers: [PaymentService]
})
export class PaymentModule {}
