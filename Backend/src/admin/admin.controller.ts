import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './update-admin.dto';
import { CouponDTO } from 'src/Payment/Coupon_DTO/Coupon.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all admins
  @Get()
  async getAllAdmins() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async getAdminById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findById(id);
  }

  // Update admin profile
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  // Change admin password
  @Patch(':id/change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Param('id') id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.adminService.changePassword(id, newPassword);
  }

  // Post a new coupon
  @Post('coupon')
  async postCoupon(@Body() couponDto: CouponDTO) {
    return this.adminService.createCoupon(couponDto);
  }

  // Get a coupon by code
  @Get('coupon/:code')
  async getCoupon(@Param('code') code: string) {
    return this.adminService.getCouponByCode(code);
  }
}
