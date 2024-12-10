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

  // Upload profile picture
  @Patch(':id/upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination:
          'D:/Fall 24-25/Webtech/Office of Sports(Project)/Office-of-Sports-/Backend/uploads/admins',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          callback(null, `admin-${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateAdminDto: UpdateAdminDto = {
      profilePicture: file.filename,
    };
    return this.adminService.updateAdmin(id, updateAdminDto);
  }
}
