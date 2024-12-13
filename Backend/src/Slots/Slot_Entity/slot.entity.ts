import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity'; // Import the Booking entity

import { Sport } from 'src/sports/Sports_Entity/sports.entity';

@Entity('Slot')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: 0, nullable: false })
  member: string;

  @Column({ default: false })
  is_booked: boolean;

  @OneToMany(() => Booking, (booking) => booking.slot) // Define the inverse relationship to Booking
  bookings: Booking[]; // This represents all bookings for this slot

  @ManyToOne(() => Sport, (sport) => sport.slots) // Define the relationship to Sport
  sport: Sport; // This is the foreign key relation to the Sport entity
}
