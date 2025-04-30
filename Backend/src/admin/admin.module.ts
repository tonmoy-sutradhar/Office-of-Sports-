import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { Admin } from './Admin_Entity/admin.entity';
import { Coupon } from '../payment/Coupon_Entity/Coupon.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './token';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Coupon]),JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h'}
  })],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, TypeOrmModule],
})
export class AdminModule {}
