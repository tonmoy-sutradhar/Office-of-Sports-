import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './Feedback_Entity/feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Sport, Student_Regi])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
