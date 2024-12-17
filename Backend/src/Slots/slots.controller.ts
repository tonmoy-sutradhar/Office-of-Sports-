import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { Slot } from './Slot_Entity/slot.entity';
import { adminAuthGuard } from 'src/admin/adminGuard.guard';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  // Add a new slot
  @Post()
  @UseGuards(adminAuthGuard)
  async addSlot(@Body() slotData: Partial<Slot>): Promise<Slot> {
    return this.slotsService.addSlot(slotData);
  }

  // Edit a slot
  @Put(':id')
  @UseGuards(adminAuthGuard)
  async updateSlot(
    @Param('id') id: number,
    @Body() slotData: Partial<Slot>,
  ): Promise<Slot> {
    return this.slotsService.updateSlot(Number(id), slotData);
  }

  // Delete a slot
  @Delete(':id')
  @UseGuards(adminAuthGuard)
  async deleteSlot(@Param('id') id: number): Promise<void> {
    return this.slotsService.deleteSlot(Number(id));
  }

  // Get all slots
  @Get()
  async getAllSlots(): Promise<Slot[]> {
    return this.slotsService.getAllSlots();
  }

  // Get a slot by ID
  @Get(':id')
  async getSlotById(@Param('id') id: number): Promise<Slot> {
    return this.slotsService.getSlotById(Number(id));
  }
}
