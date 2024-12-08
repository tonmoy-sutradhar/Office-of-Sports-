import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student_Regi } from 'src/auth/Student_Entity/student.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';

  @Entity('bookings')
  export class Booking {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Student_Regi, (students) => students.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student: Student_Regi;
  
    @ManyToOne(() => Slot, (slots) => slots.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slot_id' })
    slot: Slot;
  
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
  