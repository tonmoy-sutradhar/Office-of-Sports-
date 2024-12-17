import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';

@Entity('Feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  // Many-to-One relationship with Sport
  @ManyToOne(() => Sport, (sport) => sport.feedbacks, { eager: true })
  @JoinColumn({ name: 'sport_id' })
  sport: Sport; // This refers to the Sport associated with the feedback

  // ManyToOne relationship to Student_Regi
  @ManyToOne(() => Student_Regi, (student) => student.feedbacks, {
    eager: true,
  }) // Link back to Student
  @JoinColumn({ name: 'student_id' })
  student: Student_Regi; // This refers to the Student who provided the feedback
}
