import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Student_Regi } from './Student_Entity/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UserController } from './user.controller';
import { Main_StudentDB } from './Student_Entity/Maindb.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student_Regi,Main_StudentDB,Sport,Slot,Booking])],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports : [UserService]
})
export class UserModule {}
