import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './Admin_Entity/admin.entity';
import { UpdateAdminDto } from './update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // Find admin by ID
  async findById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  // Update admin details
  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    return this.findById(id);
  }

  // Change password
  async changePassword(id: number, newPassword: string): Promise<Admin> {
    const admin = await this.findById(id);
    admin.password = newPassword;
    return this.adminRepository.save(admin);
  }
}
