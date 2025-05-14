import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { Admin } from './Admin_Entity/admin.entity';
import { UpdateAdminDto, ValidAdminDTO } from './update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from 'src/Payment/Coupon_Entity/Coupon.entity';
import { CouponDTO } from '../Payment/Coupon_DTO/Coupon.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    private readonly jwtService:JwtService,
  ) {}

  async login(loginData:ValidAdminDTO,res) : Promise<{message: string,Admin_Token:string}>{
          const user = await this.adminRepository.findOneBy({email:loginData.email});
          if(!user){
              throw new UnauthorizedException("User not Found");
          }
          const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
          if(!isPasswordValid){
              throw new UnauthorizedException("Invalid Password");
          }
          const payload = {
              AdminId: user.id,            // Assuming the user model has an `id` property
          };
          const Admin_Token = await this.jwtService.signAsync(payload);
          res.cookie('Admin_token',Admin_Token,{httpOnly:true});
          return{
              message: "Login Sucessfull for Admin",Admin_Token
          };
      }

      async logout(req,res){
        res.clearCookie('Admin_token');
           req.session.destroy((err) => {
           if (err) {
             console.error('Session destroy error:', err);
             throw new Error('Error logging out');
           }
           });
       
           return {
           message: 'Logout Successful',
           };
         }

  // Find admin by ID
  async findById(id: number) {
    const {password, ...admin} = await this.adminRepository.findOne({ where: { id: id } });
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
  ) {
    await this.adminRepository.update(id, updateAdminDto);
    return {message: 'Admin updated successfully'};
  }

  // Change password
  async changePassword(id: number, newPassword: string): Promise<{ message: string }> {
    const admin = await this.adminRepository.findOne({ where: { id : id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    admin.password = hashedPassword;
    await this.adminRepository.save(admin);

    return {
      message: 'Password changed successfully',
    };
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
