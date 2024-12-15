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
  timestamp: Date; // Automatically records the search timestamp

  @ManyToOne(() => Admin, { nullable: true }) // Relation to Admin entity
  @JoinColumn({ name: 'admin_id' }) // Foreign key column name in the database
  admin: Admin; // admin j search korbe
}
