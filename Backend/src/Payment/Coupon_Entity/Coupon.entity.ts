import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

    @Entity('Coupons')
    export class Coupon {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ unique: true })
      code: string; // e.g., 'Coupon100'
    
      @Column('decimal', { precision: 10 })
      value: number; // The monetary value of the coupon, e.g., 100.00
    
      @Column({ default: false })
      isUsed: boolean; // Whether the coupon has been used
    
      @CreateDateColumn()
      createdAt: Date; // When the coupon was created
    }
    