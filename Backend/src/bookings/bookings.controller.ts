import { Controller, Post, Body, Param, Get, Delete,UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/booking.dto';
import { JwtService } from '@nestjs/jwt';
import { userAuthGuard } from 'src/User/auth/userAuth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService,
    private readonly jwtService:JwtService,
  ) {}

  @Post('create')
  @UseGuards(userAuthGuard)
  async createBooking(@Body() createBookingDto: CreateBookingDto,@Req()req) {
    const token = req.cookies['access_token']; // Or extract it from the Authorization header
    const decodedPayload = await this.jwtService.verifyAsync(token);
    return this.bookingsService.createBooking(createBookingDto,decodedPayload.userId);
  }

  @Get('list')
  async listBookings(@Req()req) {
    const token = req.cookies['access_token']; // Or extract it from the Authorization header
    const decodedPayload = await this.jwtService.verifyAsync(token);
    const studentId = decodedPayload.userId;
    return this.bookingsService.listBookings(studentId);
  }

  @Delete('cancel/:bookingId')
  async cancelBooking(@Param('bookingId') bookingId: number) {
    return this.bookingsService.cancelBooking(bookingId);
  }
}
