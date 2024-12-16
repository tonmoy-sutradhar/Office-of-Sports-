import { Injectable, NotFoundException } from '@nestjs/common';
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

    // Find and validate the sport entity
    const sport = await this.sportRepository.findOne({
      where: { id: sportId },
    });
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${sportId} not found`);
    }

    // Find and validate the student entity
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Create and save the feedback
    const feedback = this.feedbackRepository.create({
      ...rest,
      sport,
      student,
    });

    // Save feedback and update feedback count for the sport
    await this.feedbackRepository.save(feedback);
    await this.updateSportFeedbackCount(sportId); // Update feedback count for sport

    return feedback;
  }

  // Update sport feedback count
  private async updateSportFeedbackCount(sportId: number) {
    const feedbackCount = await this.feedbackRepository.count({
      where: { sport: { id: sportId } },
    });

    await this.sportRepository.update(sportId, {
      feedbackCount: feedbackCount, // Update the feedbackCount field of the sport
    });
  }

  // Get sport popularity analytics
  async getSportPopularity() {
    try {
      console.log('Fetching sport popularity...');

      // Fetch sports and their feedback counts from the feedback table
      const sportsPopularity = await this.feedbackRepository
        .createQueryBuilder('feedback')
        .leftJoin('feedback.sport', 'sport')
        .select('sport.id', 'sportId')
        .addSelect('COUNT(feedback.id)', 'feedbackCount') // Counting feedbacks
        .groupBy('sport.id')
        .orderBy('feedbackCount', 'DESC')
        .getRawMany();

      console.log('Raw query result:', sportsPopularity);

      // Return sports and their feedback count as an object
      return sportsPopularity.map((item) => ({
        sportId: item.sportId,
        feedbackCount: parseInt(item.feedbackCount, 10), // Convert feedbackCount to integer
      }));
    } catch (error) {
      console.error('Error fetching sport popularity:', error.message);
      throw new Error('An error occurred while fetching sport popularity.');
    }
  }

  // Get the most popular sport based on feedback count
  async getMostPopularSport() {
    try {
      const sportsPopularity = await this.getSportPopularity();

      // Find the sport with the highest feedback count
      const mostPopularSport = sportsPopularity[0];

      // Fetch the sport details from the Sport repository using the sportId
      const sport = await this.sportRepository.findOne({
        where: { id: mostPopularSport.sportId },
      });

      return {
        sport: sport.name,
        feedbackCount: mostPopularSport.feedbackCount,
      };
    } catch (error) {
      console.error('Error fetching most popular sport:', error.message);
      throw new Error(
        'An error occurred while fetching the most popular sport.',
      );
    }
  }

  // Fetch all feedbacks from the database
  async getAllFeedbacks() {
    try {
      return await this.feedbackRepository.find(); // Fetch all feedbacks
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message);
      throw new Error('An error occurred while fetching feedbacks.');
    }
  }

  // Get feedbacks by specific sport id
  async getFeedbacksBySport(sportId: number) {
    return await this.feedbackRepository.find({
      where: { sport: { id: sportId } },
    });
  }
}

// get data by id and get all data done.
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Feedback } from './Feedback_Entity/feedback.entity';
// import { CreateFeedbackDto } from './create-feedback.dto';
// import { Sport } from 'src/sports/Sports_Entity/sports.entity';
// import { Student_Regi } from 'src/User/Student_Entity/student.entity';

// @Injectable()
// export class FeedbacksService {
//   getMostPopularSport() {
//     throw new Error('Method not implemented.');
//   }
//   constructor(
//     @InjectRepository(Feedback)
//     private readonly feedbackRepository: Repository<Feedback>,

//     @InjectRepository(Sport)
//     private readonly sportRepository: Repository<Sport>,

//     @InjectRepository(Student_Regi)
//     private readonly studentRepository: Repository<Student_Regi>,
//   ) {}

//   // Add new feedback
//   async addFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
//     const { sport: sportId, student: studentId, ...rest } = createFeedbackDto;

//     // Find and validate the sport entity
//     const sport = await this.sportRepository.findOne({
//       where: { id: sportId },
//     });
//     if (!sport) {
//       throw new NotFoundException(`Sport with ID ${sportId} not found`);
//     }

//     // Find and validate the student entity
//     const student = await this.studentRepository.findOne({
//       where: { id: studentId },
//     });
//     if (!student) {
//       throw new NotFoundException(`Student with ID ${studentId} not found`);
//     }

//     // Create and save the feedback
//     const feedback = this.feedbackRepository.create({
//       ...rest,
//       sport,
//       student,
//     });

//     return await this.feedbackRepository.save(feedback);
//   }

//   // Sport popularity analytics

//   async getSportPopularity() {
//     try {
//       console.log('Fetching sport popularity...');

//       const sportsPopularity = await this.feedbackRepository
//         .createQueryBuilder('feedback')
//         .leftJoin('feedback.sport', 'sport')
//         .select('sport.id', 'sportId')
//         .addSelect('COUNT(feedback.id)', 'feedbackCount') // Counting the feedbacks for each sport
//         .groupBy('sport.id')
//         .orderBy('feedbackCount', 'DESC') // Ordering by the count of feedbacks
//         .getRawMany();

//       console.log('Raw query result:', sportsPopularity);

//       return sportsPopularity.map((item) => ({
//         sportId: item.sportId,
//         feedbackCount: parseInt(item.feedbackCount, 10), // Convert the count to integer
//       }));
//     } catch (error) {
//       console.error('Error fetching sport popularity:', error.message);
//       throw new Error('An error occurred while fetching sport popularity.');
//     }
//   }

//   // Fetch all feedbacks from the database
//   async getAllFeedbacks() {
//     try {
//       return await this.feedbackRepository.find(); // Fetch all feedbacks
//     } catch (error) {
//       console.error('Error fetching feedbacks:', error.message);
//       throw new Error('An error occurred while fetching feedbacks.');
//     }
//   }

//   // feedbacks by specific sport id
//   async getFeedbacksBySport(sportId: number) {
//     return await this.feedbackRepository.find({
//       where: { sport: { id: sportId } },
//     });
//   }
// }

// ///////////////////////
