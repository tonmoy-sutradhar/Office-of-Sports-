import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';

@Entity('slots')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Sport, (sport) => sport.slots, {
  //   onDelete: 'CASCADE',
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'sport_id' })
  // sport: Sport;
  @ManyToOne(() => Sport, (sport) => sport.slots, {
    onDelete: 'CASCADE',
    nullable: true, // Allow sport to be null
  })
  @JoinColumn({ name: 'sport_id' })
  sport: Sport;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'boolean', default: false })
  is_booked: boolean;
}
