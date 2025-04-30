import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../bookings/Booking_Entity/booking.entity';
import { Student_Regi } from '../User/Student_Entity/student.entity';
import { Repository } from 'typeorm';
import { Coupon } from './Coupon_Entity/Coupon.entity'; // Import Coupon entity
import { Slot } from '../Slots/Slot_Entity/slot.entity';
import { NotificationService } from '../notifications/notifications.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia',
  });
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @InjectRepository(Student_Regi)
    private studentRepository: Repository<Student_Regi>,

    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>, // Inject Coupon repository

    @InjectRepository(Slot)
    private slotRepo: Repository<Slot>,
    private readonly notificationService:NotificationService,
  ) {}


  async createPaymentIntent(): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount:50,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
  }

  /**
   * Adds balance to a student's account using a coupon code.
   * @param university_id - The ID of the student (primary key in the database).
   * @param couponCode - The coupon code for adding balance.
   */
  async addBalance(university_id: number, couponCode: string) {

    const student = await this.studentRepository.findOne({
      where: { id: university_id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Fetch coupon details from the database
    const coupon = await this.couponRepository.findOne({
      where: { code: couponCode },
    });

    if (!coupon) {
      throw new BadRequestException('Invalid coupon code');
    }

    if (coupon.isUsed) {
      throw new BadRequestException('Coupon has already been used');
    }

    // Add coupon value to the student's balance
    const addedBalance = coupon.value;
    student.balance = (student.balance || 0) + addedBalance;

    // Mark coupon as used
    coupon.isUsed = true;

    // Save changes to the database
    await this.studentRepository.save(student);
    await this.couponRepository.save(coupon);

    return {
      balance: student.balance,
      message: `Balance updated successfully. Added ${addedBalance} Taka using coupon ${couponCode}.`,
    };
  }

  /**
   * Deducts balance from a student's account based on the booking's payment status.
   * @param university_id - The ID of the student.
   * @param bookingId - The booking ID for which payment is being made.
   * @param amount - Amount to deduct.
   */
  async deductBalance(
    university_id: number,
    bookingId: number,
    slotID:number,
    amount: number,
  ) {
    const student = await this.studentRepository.findOne({
      where: { id: university_id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Check if the student has enough balance
    if ((student.balance || 0) < amount) {
      throw new BadRequestException('Insufficient balance.');
    }

    // Find the booking associated with the student and the bookingId
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['student'], // Ensure that booking has a reference to the student
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Ensure the booking belongs to the student
    else if (booking.student.id !== university_id) {
      throw new BadRequestException('Booking does not belong to the student');
    }

    else if(booking.payment_status === 'paid'){
      throw new BadRequestException('Payment already done for this booking');
    }

    const slot = await this.slotRepo.findOneBy({id:slotID});

    // Deduct the balance from the student
    student.balance -= amount;
    await this.studentRepository.save(student);

    // Update booking payment status
    booking.payment_status = 'paid';
    await this.bookingRepository.save(booking);

    slot.member += 1;
    await this.slotRepo.save(slot);


    this.notificationService.sendNotification(
      'Payment Done', // Title
      'Your payment was successfully processed.', // Message
      true // Sound (optional, defaults to true)
    );

    
    return {
      balance: student.balance,
      message: `Payment successful for booking ${bookingId}. Deducted ${amount} Taka.`,
    };
  }

  /**
   * Retrieves the current balance of a student.
   * @param university_id - The ID of the student.
   */
  async getBalance(university_id: number) {
    const student = await this.studentRepository.findOne({
      where: { id: university_id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }


    return {
      balance: student.balance || 0,
    };
  }

  /**
   * Retrieves the booking status and payment status for a particular booking.
   * @param bookingId - The ID of the booking.
   */
  async getBookingStatus(bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return {
      booking_status: booking.status,
      payment_status: booking.payment_status,
    };
  }
}
