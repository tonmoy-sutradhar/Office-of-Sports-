import {
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number; // Refers to the `Student_Regi` ID

  @IsNumber()
  @IsNotEmpty()
  slotId: number; // Refers to the `Slot` ID

  @IsNumber()
  @IsNotEmpty()
  sportId: number; // Refers to the `Sport` ID

  @IsEnum(['booked', 'canceled', 'attended'], {
    message: 'Status must be either booked, canceled, or attended',
  })
  status: 'booked' | 'canceled' | 'attended';

  @IsEnum(['paid', 'unpaid'], {
    message: 'Payment status must be either paid or unpaid',
  })
  payment_status: 'paid' | 'unpaid';

  @IsDateString()
  @IsNotEmpty()
  date: string; // The date of the slot, e.g., "2024-12-12"
}
