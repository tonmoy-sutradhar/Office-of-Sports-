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

    try {
      return await this.paymentService.addBalance(studentId, couponCode);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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

    try {
      return await this.paymentService.deductBalance(
        studentId,
        bookingId,
        amount,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
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

    try {
      return await this.paymentService.getBalance(studentId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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

    try {
      return await this.paymentService.getBookingStatus(bookingId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
