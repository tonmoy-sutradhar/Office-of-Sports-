// import { Controller } from '@nestjs/common';

// @Controller('feedbacks')
// export class FeedbacksController {}
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './create-feedback.dto';
// import { CreateFeedbackDto } from './create-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  // Add new feedback
  @Post()
  async addFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbacksService.addFeedback(createFeedbackDto);
  }

  // Get sport popularity analytics
  @Get('analytics')
  async getSportPopularity() {
    return await this.feedbacksService.getSportPopularity();
  }
}
