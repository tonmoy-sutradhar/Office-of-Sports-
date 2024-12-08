import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';

@Entity('students')
export class Student_Regi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  university_id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Booking, (booking) => booking.student, { lazy: true })
  bookings: Promise<Booking[]>;
}