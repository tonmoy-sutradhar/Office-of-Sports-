import {
  Controller,
  Post,
  Body,
  BadRequestException,
  NotFoundException,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaymentService } from './payment.service';
import { JwtService } from '@nestjs/jwt';
import { userAuthGuard } from '../User/auth/userAuth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    private readonly jwtService:JwtService,
  ) {}

  /**
   * Endpoint to add balance to a student's account using a coupon code.
   * @param studentId - ID of the student.
   * @param couponCode - Mock coupon code for adding balance.
   */
  @Post('/add-balance')
  @UseGuards(userAuthGuard)
  async addBalance(
    @Req()req,
    @Body('couponCode') couponCode: string,
  ) {
        const token = req.cookies['access_token']; // Or extract it from the Authorization header
        const decodedPayload = await this.jwtService.verifyAsync(token);
    if (!decodedPayload.userId || !couponCode) {
      throw new BadRequestException('Student ID and Coupon Code are required.');
    }

    try {
      return await this.paymentService.addBalance(decodedPayload.userId, couponCode);
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
  @Post('/deduct-balance')
  @UseGuards(userAuthGuard)
  async deductBalance(
    @Req()req,
    @Body('bookingId') bookingId: number,
    @Body('slotID') slotID:number,
  ) {
        const amount = 50;
         const token = req.cookies['access_token']; // Or extract it from the Authorization header
        const decodedPayload = await this.jwtService.verifyAsync(token);
    if (!decodedPayload.userId || !bookingId || amount <= 0 || !slotID) {
      throw new BadRequestException(
        'Invalid student ID, booking ID, Slot ID or amount.',
      );
    }

    try {
      return await this.paymentService.deductBalance(
        decodedPayload.userId,
        bookingId,
        slotID,
        amount,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post('/create-pay')
   async createPaymentIntent(@Body('amount')amount,@Res() res) {
    try {
      const paymentIntent = await this.paymentService.createPaymentIntent();
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Endpoint to check the balance of a student.
   * @param studentId - ID of the student.
   */
  @Post('get-balance')
  @UseGuards(userAuthGuard)
  async getBalance(@Req()req) {
    const token = req.cookies['access_token']; // Or extract it from the Authorization header
    const decodedPayload = await this.jwtService.verifyAsync(token);
    const studentId = decodedPayload.userId;
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
  @UseGuards(userAuthGuard)
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
