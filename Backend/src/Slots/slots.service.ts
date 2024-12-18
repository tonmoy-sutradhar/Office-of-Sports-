import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from './Slot_Entity/slot.entity';
import { slotDTO } from './slotDTO/slotDTO.dto';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,
  ) {}

  async addSlot(slotData: Partial<Slot>): Promise<Slot> {
    if (!slotData.sport || !slotData.sport.id) {
      throw new Error('Sport ID is required to associate with the slot.');
    }
    const newSlot = this.slotRepository.create(slotData);
    return await this.slotRepository.save(newSlot);
  }

  // Edit a slot
  async updateSlot(id: number, slotData: slotDTO) {
    // Use an object for the fields you want to update
    await this.slotRepository.update(id, {
      date: slotData.date,
      start_time: slotData.start_time,
      end_time: slotData.end_time
    });
    const show = await this.slotRepository.findOne({ where: { id } });
    // Return the updated Slot entity
    return {message:"Slot time Updated Successfully",show};
  }

  // Delete a slot
  async deleteSlot(id: number) {
    const IsPresent = await this.slotRepository.findOneBy({id:id})
    if(!IsPresent)
    {
      throw new BadGatewayException("Slot not exists");
    }
    await this.slotRepository.delete(id);
    return {message:"Slot deleted Successfully"}
  }

  // Get all slots
  async getAllSlots(): Promise<Slot[]> {
    return await this.slotRepository.find({ relations: ['sport'] });
  }

  // Get single slot by ID
  async getSlotById(id: number): Promise<Slot> {
    return await this.slotRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
  }
}
