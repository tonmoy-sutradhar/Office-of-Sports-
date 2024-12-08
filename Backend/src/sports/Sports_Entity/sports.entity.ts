import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';

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

  @OneToMany(() => Feedback, (feedback) => feedback.sport, { lazy: true })
  feedbacks: Promise<Feedback[]>;

  @OneToMany(() => Slot, (slots) => slots.sport, { lazy: true })
  slots: Promise<Slot[]>;
}
