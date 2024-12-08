import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student_Regi } from 'src/auth/Student_Entity/student.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student_Regi,Slot])],
  providers: [BookingsService]
})
export class BookingsModule {}
