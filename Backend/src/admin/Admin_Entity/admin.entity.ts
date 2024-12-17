import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profilePicture: string;
}
