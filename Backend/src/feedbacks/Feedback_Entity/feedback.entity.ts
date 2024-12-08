import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student_Regi } from 'src/auth/Student_Entity/student.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student_Regi)
  @JoinColumn({ name: 'student_id' })
  student: Student_Regi;

  @ManyToOne(() => Sport)
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;

  @Column('text')
  feedback_text: string;

  @Column('int')
  rating: number; // rating between 1 and 5
}
