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
  sport: Sport;

  // Many-to-One relationship with Student_Regi
  @ManyToOne(() => Student_Regi, (student) => student.feedbacks, {
    eager: true,
  })
  @JoinColumn({ name: 'student_id' })
  student: Student_Regi;

  // Timestamps for tracking
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Feedback count (number of feedbacks for a sport)
  @Column({ type: 'float', default: 0 })
  feedbackCount: number;

  // // Feedback count ( column)
  // @Column({ type: 'int', default: 0 })
  // feedbackCount: number;
}

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { Student_Regi } from 'src/User/Student_Entity/student.entity';
// import { Sport } from 'src/sports/Sports_Entity/sports.entity';

// @Entity('Feedback')
// export class Feedback {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'text' })
//   comment: string;

//   @Column({ type: 'int', default: 0 })
//   rating: number;

//   // ManyToOne relationship to Sport
//   @ManyToOne(() => Sport, (sport) => sport.feedbacks, { eager: true }) // Link back to Sport
//   @JoinColumn({ name: 'sport_id' })
//   sport: Sport; // This refers to the Sport associated with the feedback
// }
