import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
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

  @OneToMany(() => Booking, (booking) => booking.slot)
  bookings: Booking[];

  @ManyToOne(() => Sport, (sport) => sport.slots, { nullable: false })
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;
}
