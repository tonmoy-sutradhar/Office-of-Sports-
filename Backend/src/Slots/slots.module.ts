import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Slot } from './Slot_Entity/slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Sport])],
  providers: [SlotsService],
  controllers: [SlotsController],
  exports: [SlotsService], // Export SlotsService for using another module
})
export class SlotsModule {}
