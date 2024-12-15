// import { Module } from '@nestjs/common';
// import { FeedbacksService } from './feedbacks.service';

// @Module({
//   providers: [FeedbacksService],
// })
// export class FeedbacksModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Feedback } from './Feedback_Entity/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, Sport, Student_Regi])],
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}

// http://localhost:3000/feedbacks --> for run the file

// Data --->
// {
//   "comment": "Great sport! Highly recommended.",
//   "rating": 8,
//   "sport": 1,
//   "student": 2
// }

// http://localhost:3000/feedbacks/sport-popularity ---> for run the postman
