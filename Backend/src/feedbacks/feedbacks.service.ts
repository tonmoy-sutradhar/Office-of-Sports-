import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './Feedback_Entity/feedback.entity';
import { Student_Regi } from 'src/User/Student_Entity/student.entity';
import { Sport } from 'src/sports/Sports_Entity/sports.entity';

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

  /**
   * Add feedback for a sport by a student.
   * Ensures both student and sport exist before creating feedback.
   */
  async addFeedback(
    studentId: number,
    sportId: number,
    comment: string,
    rating: number,
  ): Promise<Feedback> {
    // Validate student existence
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found.`);
    }

    // Validate sport existence
    const sport = await this.sportRepository.findOneBy({ id: sportId });
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${sportId} not found.`);
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5.');
    }

    // Create and save feedback
    const feedback = this.feedbackRepository.create({
      comment,
      rating,
      sport,
      student,
    });

    return this.feedbackRepository.save(feedback);
  }

  /**
   * Get the average rating for a sport.
   * Returns 0 if there are no feedback entries for the sport.
   */
  async getAverageRating(sportId: number): Promise<{ averageRating: number }> {
    // Validate sport existence
    const sport = await this.sportRepository.findOneBy({ id: sportId });
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${sportId} not found.`);
    }

    // Get feedbacks for the sport
    const feedbacks = await this.feedbackRepository.find({
      where: { sport: { id: sportId } },
    });

    if (feedbacks.length === 0) {
      return { averageRating: 0 }; // No feedback yet
    }

    const totalRating = feedbacks.reduce(
      (sum, feedback) => sum + feedback.rating,
      0,
    );

    return { averageRating: totalRating / feedbacks.length };
  }

  /**
   * Get all feedback entries for a specific sport.
   * Ensures the sport exists before fetching feedback.
   */
  async getFeedbacksForSport(sportId: number): Promise<Feedback[]> {
    // Validate sport existence
    const sport = await this.sportRepository.findOneBy({ id: sportId });
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${sportId} not found.`);
    }

    // Fetch and return feedbacks for the sport
    return this.feedbackRepository.find({
      where: { sport: { id: sportId } },
      relations: ['sport', 'student'], // Include sport and student relations
    });
  }

  /**
   * Get all feedbacks, including details about the associated student and sport.
   */
  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      relations: ['sport', 'student'], // Include sport and student relations
    });
  }
}
