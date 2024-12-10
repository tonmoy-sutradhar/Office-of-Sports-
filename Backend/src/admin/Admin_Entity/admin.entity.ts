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

// 1.	Admin Panel for Managing Slots: Admin can add, edit, or delete slots for sports. ---> Done
// 2.	Real-Time Notifications: Notify students about slot confirmation, cancellations, or updates using email
// 3.	Add new sport --> Done
// 4.	Search registered Student and ban-unBan
// 5.	Admin profile picture, email, password ---->>Done
// 6.	Sport Popularity Analytics: admin can see which sport is popular based on student feedback. Star count
