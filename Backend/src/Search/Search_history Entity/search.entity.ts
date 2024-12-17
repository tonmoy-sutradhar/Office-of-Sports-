import { Admin } from 'src/admin/Admin_Entity/admin.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('search_history')
export class Search {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  query: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
