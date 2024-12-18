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
  Res,
  UseGuards, Req
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto, ValidAdminDTO } from './update-admin.dto';
import { CouponDTO } from 'src/Payment/Coupon_DTO/Coupon.dto';
import { adminAuthGuard } from './adminGuard.guard';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body()data:ValidAdminDTO,@Res({passthrough:true})res:Response) {
    return await this.adminService.login(data,res);
  }

  @Post('logout')
      async logout(@Req() request: any, @Res({passthrough:true}) response: any): Promise<{ message: string }> {
      return await this.adminService.logout(request,response);
      }

  // Get all admins
  @Get()
  @UseGuards(adminAuthGuard)
  async getAllAdmins() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @UseGuards(adminAuthGuard)
  async getAdminById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findById(id);
  }

  // Update admin profile
  @Patch(':id')
  @UseGuards(adminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateAdmin(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  // Change admin password
  @Patch(':id/change-password')
  @UseGuards(adminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Param('id') id: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.adminService.changePassword(id, newPassword);
  }

  // Post a new coupon
  @Post('coupon')
 // @UseGuards(adminAuthGuard)
  async postCoupon(@Body() couponDto: CouponDTO) {
    return this.adminService.createCoupon(couponDto);
  }

  // Get a coupon by code
  @Get('coupon/:code')
  @UseGuards(adminAuthGuard)
  async getCoupon(@Param('code') code: string) {
    return this.adminService.getCouponByCode(code);
  }
}
