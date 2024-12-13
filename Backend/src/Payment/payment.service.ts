import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/Booking_Entity/booking.entity';
import { Student_Regi } from 'src/auth/Student_Entity/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @InjectRepository(Student_Regi)
    private studentRepository: Repository<Student_Regi>, // Repository for Student_Regi entity
  ) {}

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

    let addedBalance = 0;

    // Validate coupon codes and assign corresponding balance
    if (couponCode === 'COUPON100') {
      addedBalance = 100;
    } else if (couponCode === 'COUPON200') {
      addedBalance = 200;
    } else if (couponCode === 'COUPON500') {
      addedBalance = 500;
    } else {
      throw new BadRequestException('Invalid coupon code');
    }

    // Update student balance

    student.balance = (student.balance || 0) + addedBalance;
    await this.studentRepository.save(student);

    return {
      balance: student.balance,
      message: `Balance updated successfully. Added ${addedBalance} Taka.`,
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
    if (booking.student.id !== university_id) {
      throw new BadRequestException('Booking does not belong to the student');
    }

    // Deduct the balance from the student
    student.balance -= amount;
    await this.studentRepository.save(student);

    // Update booking payment status
    booking.payment_status = 'paid';
    await this.bookingRepository.save(booking);

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
