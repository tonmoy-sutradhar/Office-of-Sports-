import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { diskStorage } from 'multer';
import { UpdateAdminDto } from './update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
