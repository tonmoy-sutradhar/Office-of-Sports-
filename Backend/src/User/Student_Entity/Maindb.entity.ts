import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('UniStudentDB')
export class Main_StudentDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  university_id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  phone_number: string;

  @Column()
  location: string; 

  @Column({ nullable: true })
  picture: string; 

  @Column({ unique: true })
  nid_number: string; 

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}