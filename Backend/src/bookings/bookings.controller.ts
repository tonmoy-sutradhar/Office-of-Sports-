import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create')
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }

  @Get('list/:studentId')
  async listBookings(@Param('studentId') studentId: number) {
    return this.bookingsService.listBookings(studentId);
  }

  @Delete('cancel/:bookingId')
  async cancelBooking(@Param('bookingId') bookingId: number) {
    return this.bookingsService.cancelBooking(bookingId);
  }
}
