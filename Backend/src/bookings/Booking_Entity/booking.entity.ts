import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student_Regi } from 'src/auth/Student_Entity/student.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity'; // Ensure the import is correct

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student_Regi, (student) => student.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student_Regi;

  @ManyToOne(() => Slot, (slot) => slot.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slot_id' })
  slot: Slot;

  // ManyToOne relationship with Sport
  @ManyToOne(() => Sport, (sport) => sport.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sport_id' })
  sport: Sport; // This refers to the Sport entity

  @Column({
    type: 'enum',
    enum: ['booked', 'canceled', 'attended'],
    default: 'booked',
  })
  status: 'booked' | 'canceled' | 'attended';

  @Column({
    type: 'enum',
    enum: ['paid', 'unpaid'],
    default: 'unpaid',
  })
  payment_status: 'paid' | 'unpaid';
}
