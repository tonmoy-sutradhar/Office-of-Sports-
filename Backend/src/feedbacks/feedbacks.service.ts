// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class FeedbacksService {}

// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Feedback } from './Feedback_Entity/feedback.entity';
// import { CreateFeedbackDto } from './create-feedback.dto';

// @Injectable()
// export class FeedbacksService {
//   constructor(
//     @InjectRepository(Feedback)
//     private readonly feedbackRepository: Repository<Feedback>,
//   ) {}

//   // Add new feedback
//   async addFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
//     const feedback = this.feedbackRepository.create(createFeedbackDto);
//     return await this.feedbackRepository.save(feedback);
//   }

//   // Sport popularity analytics
//   async getSportPopularity() {
//     const sportsPopularity = await this.feedbackRepository
//       .createQueryBuilder('feedback')
//       .leftJoin('feedback.sport', 'sport') // Join the Sport entity
//       .select('sport.id', 'sportId') // Use sport.id instead of sport_id
//       .addSelect('COUNT(feedback.id)', 'feedbackCount')
//       .addSelect('AVG(feedback.rating)', 'averageRating')
//       .groupBy('sport.id') // Group by sport.id instead of sport_id
//       .orderBy('feedbackCount', 'DESC')
//       .getRawMany();

//     return sportsPopularity;
//   }
// }

// Its work for post feedback

// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Feedback } from './Feedback_Entity/feedback.entity';
// import { CreateFeedbackDto } from './create-feedback.dto';
// import { Sport } from 'src/sports/Sports_Entity/sports.entity';
// import { Student_Regi } from 'src/User/Student_Entity/student.entity';
// // import { Student_Regi } from 'src/students/student.entity'; // Import the Student entity

// @Injectable()
// export class FeedbacksService {
//   constructor(
//     @InjectRepository(Feedback)
//     private readonly feedbackRepository: Repository<Feedback>,

//     @InjectRepository(Sport)
//     private readonly sportRepository: Repository<Sport>, // Add the Sport repository to load sport by ID

//     @InjectRepository(Student_Regi)
//     private readonly studentRepository: Repository<Student_Regi>, // Add the Student repository
//   ) {}

//   // Add new feedback
//   async addFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
//     const { sport: sportId, student: studentId, ...rest } = createFeedbackDto;

//     // Find the sport entity using the provided sportId
//     const sport = await this.sportRepository.findOne({
//       where: { id: sportId },
//     });

//     if (!sport) {
//       throw new Error(`Sport with ID ${sportId} not found`);
//     }

//     // Find the student entity using the provided studentId
//     const student = await this.studentRepository.findOne({
//       where: { id: studentId },
//     });

//     if (!student) {
//       throw new Error(`Student with ID ${studentId} not found`);
//     }

//     // Create the feedback object with the correct sport and student entities
//     const feedback = this.feedbackRepository.create({
//       ...rest,
//       sport,
//       student, // Pass the student entity, not just the ID
//     });

//     return await this.feedbackRepository.save(feedback);
//   }

//   // Sport popularity analytics
//   async getSportPopularity() {
//     const sportsPopularity = await this.feedbackRepository
//       .createQueryBuilder('feedback')
//       .leftJoin('feedback.sport', 'sport') // Join the Sport entity
//       .select('sport.id', 'sportId') // Use sport.id instead of sport_id
//       .addSelect('COUNT(feedback.id)', 'feedbackCount')
//       .addSelect('AVG(feedback.rating)', 'averageRating')
//       .groupBy('sport.id') // Group by sport.id instead of sport_id
//       .orderBy('feedbackCount', 'DESC')
//       .getRawMany();

//     return sportsPopularity;
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './Feedback_Entity/feedback.entity';
import { CreateFeedbackDto } from './create-feedback.dto';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,

    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,

    @InjectRepository(Student_Regi)
    private readonly studentRepository: Repository<Student_Regi>,
  ) {}

  // Add new feedback
  async addFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const { sport: sportId, student: studentId, ...rest } = createFeedbackDto;

    const sport = await this.sportRepository.findOne({
      where: { id: sportId },
    });
    if (!sport) {
      throw new Error(`Sport with ID ${sportId} not found`);
    }

    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    const feedback = this.feedbackRepository.create({
      ...rest,
      sport,
      student,
    });

    return await this.feedbackRepository.save(feedback);
  }

  // Sport popularity analytics
  async getSportPopularity() {
    const sportsPopularity = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoin('feedback.sport', 'sport')
      .select('sport.id', 'sportId')
      .addSelect('COUNT(feedback.id)', 'feedbackCount')
      .addSelect('AVG(feedback.rating)', 'averageRating')
      .groupBy('sport.id')
      .orderBy('feedbackCount', 'DESC')
      .getRawMany();

    // Mapping the result to give the desired structure
    return sportsPopularity.map((item) => ({
      sportId: item.sportId,
      feedbackCount: parseInt(item.feedbackCount, 10), // Parse feedbackCount to integer
      averageRating: parseFloat(item.averageRating), // Parse averageRating to float
    }));
  }
}
