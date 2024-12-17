import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { Admin } from './Admin_Entity/admin.entity';
import { Coupon } from 'src/payment/Coupon_Entity/Coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Coupon])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
