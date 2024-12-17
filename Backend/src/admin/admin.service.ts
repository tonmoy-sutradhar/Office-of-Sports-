import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Admin } from './Admin_Entity/admin.entity';
import { UpdateAdminDto } from './update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from 'src/payment/Coupon_Entity/Coupon.entity';
import { CouponDTO } from 'src/Payment/Coupon_DTO/Coupon.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  // Find admin by ID
  async findById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  // Get all admins
  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
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

  // Create a new coupon
  async createCoupon(couponDto: CouponDTO) {
    const existingCoupon = await this.couponRepository.findOne({
      where: { code: couponDto.coupon },
    });

    if (existingCoupon) {
      throw new BadRequestException('Coupon code already exists');
    }

    const newCoupon = this.couponRepository.create({
      code: couponDto.coupon,
      value: 100,
    });

    await this.couponRepository.save(newCoupon);

    return {
      message: 'Coupon created successfully',
      coupon: newCoupon,
    };
  }

  // Get coupon by code
  async getCouponByCode(code: string) {
    const coupon = await this.couponRepository.findOne({ where: { code } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }
}
