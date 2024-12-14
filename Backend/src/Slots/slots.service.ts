import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from './Slot_Entity/slot.entity';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,
  ) {}

  async addSlot(slotData: Partial<Slot>): Promise<Slot> {
    if (!slotData.sport || !slotData.sport.id) {
      // It is user for included the sport file
      throw new Error('Sport ID is required to associate with the slot.');
    }
    const newSlot = this.slotRepository.create(slotData);
    return await this.slotRepository.save(newSlot);
  }

  // Edit a slot
  async updateSlot(id: number, slotData: Partial<Slot>): Promise<Slot> {
    await this.slotRepository.update(id, slotData);
    return await this.slotRepository.findOne({ where: { id } });
  }

  // Delete a slot
  async deleteSlot(id: number): Promise<void> {
    await this.slotRepository.delete(id);
  }

  // Get all slots
  async getAllSlots(): Promise<Slot[]> {
    return await this.slotRepository.find({ relations: ['sport'] });
  }

  // Get single slot by ID
  // solve
  async getSlotById(id: number): Promise<Slot> {
    return await this.slotRepository.findOne({
      where: { id },
      relations: ['sport'],
    });
  }
}
