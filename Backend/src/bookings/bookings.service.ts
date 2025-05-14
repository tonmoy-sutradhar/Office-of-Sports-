import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from '../Slots/Slot_Entity/slot.entity';
import { Booking } from './Booking_Entity/booking.entity';
import { Sport } from '../sports/Sports_Entity/sports.entity';
import { CreateBookingDto } from './dto/booking.dto';
import { Student_Regi } from '../User/Student_Entity/student.entity';
import { NotificationService } from 'src/Notifications/notifications.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    @InjectRepository(Slot) private slotRepository: Repository<Slot>,
    @InjectRepository(Sport) private sportRepository: Repository<Sport>,
    @InjectRepository(Student_Regi) private studentRepository: Repository<Student_Regi>,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Creates a booking for a specific student, sport, and slot.
   * @param CreateBookingDto - Contains the studentId, sportId, slotId, status, and payment_status.
   */
  async createBooking(createBookingDto: CreateBookingDto, studentId: number): Promise<Booking> {
    const { sportId, slotId, status } = createBookingDto;

    // Check if the student exists
    const studentExists = await this.studentRepository.findOne({
      where: { id: studentId },
      select: ['id'],
    });
    if (!studentExists) {
      throw new NotFoundException('Student not found.');
    }

    // Check if the sport exists
    const sport = await this.sportRepository.findOne({ where: { id: sportId } });
    if (!sport) {
      throw new NotFoundException('Sport not found.');
    }

    // Check if the slot exists
    const slot = await this.slotRepository.findOne({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException('Slot not found.');
    }

    // Check if the slot has reached its maximum capacity
    if (slot.member >= sport.maxPlayers) {
      throw new BadRequestException(
        `This slot has reached its maximum capacity of ${sport.maxPlayers} members.`,
      );
    }

    // Check if the student has already booked a slot on the same day for the same sport
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        student: { id: studentId },
        sport: { id: sportId },
        slot: { date: slot.date },
      },
    });
    if (existingBooking) {
      throw new BadRequestException('You can only book one slot per day for each sport.');
    }

    // Create a new booking
    const booking = this.bookingRepository.create({
      student: { id: studentId },
      sport,
      slot,
      status,
      payment_status: createBookingDto.payment_status,
    });

    // If the booking status is 'booked', mark the slot as booked
    if (status === 'booked' && slot.member === sport.maxPlayers) {
      slot.is_booked = true; // Mark slot as fully booked
    }

    // Save the updated slot and booking
    await this.slotRepository.save(slot);
    this.notificationService.sendNotification(
      'Booking Complete',
      `Your booking has been confirmed. Details: [Sport: ${sport.name}, Slot Date: ${slot.date}]`,
      true,
    );

    return this.bookingRepository.save(booking);
  }

  /**
   * Lists all bookings for a student.
   * @param studentId - The ID of the student.
   */
  async listBookings(studentId: number) {
    const bookings = await this.bookingRepository.find({
      where: { student: { id: studentId } },
      relations: ['slot', 'student', 'sport'],
    });

    if (!bookings.length) {
      throw new NotFoundException('No bookings found.');
    }

    return bookings;
  }

  /**
   * Cancels and deletes a booking by ID.
   * @param bookingId - The ID of the booking to cancel and delete.
   */
  async cancelBooking(bookingId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId },
      relations: ['slot', 'sport', 'student'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found.');
    }

    const slot = booking.slot;
    if (!slot) {
      throw new NotFoundException('Slot not found for the booking.');
    }

    // Decrement the member count for the slot
    if (slot.member <= 0) {
      slot.member = 0;
    }
    else{
    slot.member -= 1;}
    

    // If the slot was previously marked as fully booked, mark it as available
    if (slot.is_booked && slot.member < slot.sport.maxPlayers) {
      slot.is_booked = false;
    }

    await this.slotRepository.save(slot);
    await this.bookingRepository.remove(booking);

    return { message: 'Booking canceled and deleted successfully.' };
  }
}
