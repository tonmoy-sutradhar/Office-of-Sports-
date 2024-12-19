import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';

@Entity('Student')
export class Student_Regi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  university_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false }) // New column to track ban status
  isBanned: boolean;

  @Column({default: 0 })
  balance: number;

  @Column({nullable:true})
  token: string;

  @OneToMany(() => Booking, (booking) => booking.student, { lazy: true })
  bookings: Promise<Booking[]>;

  // One-to-Many relationship with Feedback
  @OneToMany(() => Feedback, (feedback) => feedback.student, { lazy: true })
  feedbacks: Promise<Feedback[]>; // This allows accessing all feedbacks by the student
}
