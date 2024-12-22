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
import { slotDTO } from './slotDTO/slotDTO.dto';
import { userAuthGuard } from 'src/User/auth/userAuth.guard';

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
  @Put('/:id')
  @UseGuards(adminAuthGuard)
  async updateSlot(
    @Param('id') id: number,
    @Body() slotData: slotDTO,
  ){
    return this.slotsService.updateSlot(id, slotData);
  }

  // Delete a slot
  @Delete('/:id')
  @UseGuards(adminAuthGuard)
  async deleteSlot(@Param('id') id: number) {
    return this.slotsService.deleteSlot(id);
  }

   // Get available slots by sport ID
   @Get('available/:sport_id')
   @UseGuards(userAuthGuard)
   async getAvailableSlots(@Param('sport_id') sportId: number): Promise<Slot[]> {
     return await this.slotsService.getAvailableSlotsBySport(sportId);
   }

  // Get all slots
  @Get()
  @UseGuards(adminAuthGuard)
  async getAllSlots(): Promise<Slot[]> {
    return this.slotsService.getAllSlots();
  }

  // Get a slot by ID
  @Get(':id')
  @UseGuards(adminAuthGuard)
  async getSlotById(@Param('id') id: number): Promise<Slot> {
    return this.slotsService.getSlotById(Number(id));
  }
}
