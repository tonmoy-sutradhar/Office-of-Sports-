import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity'; // Import the Feedback entity
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity'; // Corrected to import the Slot entity

@Entity('sports')
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: ['outdoor', 'indoor'] })
  type: 'outdoor' | 'indoor';

  @Column({ type: 'boolean', default: false })
  is_paid: boolean;

  // OneToMany relationship with Feedback
  @OneToMany(() => Feedback, (feedback) => feedback.sport)
  feedbacks: Feedback[]; // This represents the feedbacks associated with this sport

  @OneToMany(() => Booking, (booking) => booking.sport)
  bookings: Booking[]; // This represents the bookings associated with this sport

  @OneToMany(() => Slot, (slot) => slot.sport)
  slots: Slot[]; // Corrected to use Slot[] with capital S
}
