import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';

@Entity('Sport')
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: ['outdoor', 'indoor'] })
  type: 'outdoor' | 'indoor';

  @Column({type: 'int',default:0})
  price: number;

  @Column({ type: 'boolean', default: false })
  is_paid: boolean;

  @Column({ type: 'int', default: 0 })
  maxPlayers: number;

  @Column({ type: 'int', default: 0 })
  feedbackCount: number;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @OneToMany(() => Feedback, (feedback) => feedback.sport)
  feedbacks: Feedback[];

  @OneToMany(() => Booking, (booking) => booking.sport)
  bookings: Booking[];

  @OneToMany(() => Slot, (slot) => slot.sport)
  slots: Slot[];
}
