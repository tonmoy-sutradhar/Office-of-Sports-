import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './update-admin.dto';

// @Controller('admin')
// export class AdminController {
//   constructor(private readonly adminService: AdminService) {}

//   // Get all admins
//   @Get()
//   async getAllAdmins() {
//     return this.adminService.findAll();
//   }
//   @Get()

//   // Get admin by ID
//   @Get(':id')
//   async getAdminById(@Param('id') id: number) {
//     return this.adminService.findById(id);
//   }

//   // Update admin profile
//   @Patch(':id')
//   @HttpCode(HttpStatus.OK)
//   async updateAdmin(
//     @Param('id') id: number,
//     @Body() updateAdminDto: UpdateAdminDto,
//   ) {
//     return this.adminService.updateAdmin(id, updateAdminDto);
//   }

//   // Change admin password
//   @Patch(':id/change-password')
//   @HttpCode(HttpStatus.OK)
//   async changePassword(
//     @Param('id') id: number,
//     @Body('newPassword') newPassword: string,
//   ) {
//     return this.adminService.changePassword(id, newPassword);
//   }
// }
// admin.controller.ts
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all admins
  @Get()
  async getAllAdmins() {
    return this.adminService.findAll();
  }

  // Get admin by ID
  @Get(':id')
  async getAdminById(@Param('id') id: number) {
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
}
