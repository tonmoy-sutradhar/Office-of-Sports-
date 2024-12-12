// import { Feedback } from 'src/feedbacks/Feedback_Entity/feedback.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Slot } from 'src/Slots/Slot_Entity/slot.entity';

@Entity('Sport')
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: ['outdoor', 'indoor'] })
  type: 'outdoor' | 'indoor';

  @Column({ type: 'boolean', default: false })
  is_paid: boolean;

  //   @OneToMany(() => Feedback, (feedback) => feedback.sport, { lazy: true })
  //   feedbacks: Promise<Feedback[]>;

  @OneToMany(() => Slot, (slot) => slot.sport, {
    cascade: true, //This is automatically deletes associated slots
  })
  slots: Slot[];
}
