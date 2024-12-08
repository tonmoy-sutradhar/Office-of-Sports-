import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';

@Module({
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
