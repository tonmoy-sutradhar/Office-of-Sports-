import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post('addFeedback')
  async addFeedback(
    @Body('studentId') studentId: number,
    @Body('sportId') sportId: number,
    @Body('comment') comment: string,
    @Body('rating') rating: number,
  ) {
    return this.feedbacksService.addFeedback(
      studentId,
      sportId,
      comment,
      rating,
    );
  }

  @Get('average-rating/:sportId')
  async getAverageRating(@Param('sportId') sportId: number) {
    return this.feedbacksService.getAverageRating(sportId);
  }

  @Get('sport/:sportId')
  async getFeedbacksForSport(@Param('sportId') sportId: number) {
    return this.feedbacksService.getFeedbacksForSport(sportId);
  }

  @Get()
  async getAllFeedback() {
    return this.feedbacksService.getAllFeedback();
  }
}
