import {
  Controller,
  Post,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Endpoint to add balance to a student's account using a coupon code.
   * @param studentId - ID of the student.
   * @param couponCode - Mock coupon code for adding balance.
   */
  @Post('add-balance')
  async addBalance(
    @Body('studentId') studentId: number,
    @Body('couponCode') couponCode: string,
  ) {
    if (!studentId || !couponCode) {
      throw new BadRequestException('Student ID and Coupon Code are required.');
    }
    return this.paymentService.addBalance(studentId, couponCode);
  }

  /**
   * Endpoint to deduct balance for booking a slot.
   * @param studentId - ID of the student.
   * @param bookingId - ID of the booking.
   * @param amount - Amount to deduct.
   */
  @Post('deduct-balance')
  async deductBalance(
    @Body('studentId') studentId: number,
    @Body('bookingId') bookingId: number,
    @Body('amount') amount: number,
  ) {
    if (!studentId || !bookingId || amount <= 0) {
      throw new BadRequestException(
        'Invalid student ID, booking ID, or amount.',
      );
    }
    return this.paymentService.deductBalance(studentId, bookingId, amount);
  }

  /**
   * Endpoint to check the balance of a student.
   * @param studentId - ID of the student.
   */
  @Post('get-balance')
  async getBalance(@Body('studentId') studentId: number) {
    if (!studentId) {
      throw new BadRequestException('Student ID is required.');
    }
    return this.paymentService.getBalance(studentId);
  }

  /**
   * Endpoint to check the booking status and payment status for a specific booking.
   * @param bookingId - ID of the booking.
   */
  @Post('get-booking-status')
  async getBookingStatus(@Body('bookingId') bookingId: number) {
    if (!bookingId) {
      throw new BadRequestException('Booking ID is required.');
    }
    return this.paymentService.getBookingStatus(bookingId);
  }
}
