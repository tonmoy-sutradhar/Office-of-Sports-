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
  @UseGuards(adminAuthGuard)
      async logout(@Req() request: any, @Res({passthrough:true}) response: any): Promise<{ message: string }> {
      return await this.adminService.logout(request,response);
      }

  // Get all admins
  @Get()
  @UseGuards(adminAuthGuard)
  async getAllAdmins() {
    return await this.adminService.findAll();
  }

  @Get('profile')
  @UseGuards(adminAuthGuard)
  async getAdminById(@Req() req) {
    return await this.adminService.findById(req.AdminId);
  }

  // Update admin profile
  @Patch('update')
  @UseGuards(adminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateAdmin(
    @Req() req: any,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminService.updateAdmin(req.AdminId, updateAdminDto);
  }

  // Change admin password
  @Patch('change-password')
  @UseGuards(adminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: any,
    @Body('newPassword') newPassword: string,
  ) {
    return await this.adminService.changePassword(req.AdminId, newPassword);
  }

  // Post a new coupon
  @Post('coupon')
  @UseGuards(adminAuthGuard)
  async postCoupon(@Body() couponDto: CouponDTO) {
    return await this.adminService.createCoupon(couponDto);
  }

  // Get a coupon by code
  @Get('coupon/:code')
  @UseGuards(adminAuthGuard)
  async getCoupon(@Param('code') code: string) {
    return await this.adminService.getCouponByCode(code);
  }
}
