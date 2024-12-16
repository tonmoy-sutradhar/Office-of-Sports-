import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './create-feedback.dto';

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

  // Get all feedbacks
  @Get()
  async getAllFeedbacks() {
    return await this.feedbacksService.getAllFeedbacks();
  }

  // Get feedbacks by sport id
  @Get('sport/:sportId')
  async getFeedbacksBySport(@Param('sportId') sportId: number) {
    return await this.feedbacksService.getFeedbacksBySport(sportId);
  }

  // Get the most popular sport
  @Get('most-popular')
  async getMostPopularSport() {
    return await this.feedbacksService.getMostPopularSport();
  }
}

// import { Controller } from '@nestjs/common';

// @Controller('feedbacks')
// export class FeedbacksController {}
// import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
// import { FeedbacksService } from './feedbacks.service';
// import { CreateFeedbackDto } from './create-feedback.dto';

// @Controller('feedbacks')
// export class FeedbacksController {
//   constructor(private readonly feedbacksService: FeedbacksService) {}

//   // Add new feedback
//   @Post()
//   async addFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
//     return await this.feedbacksService.addFeedback(createFeedbackDto);
//   }

//   // Get sport popularity analytics
//   @Get('analytics')
//   async getSportPopularity() {
//     return await this.feedbacksService.getSportPopularity();
//   }

//   // Get all feedbacks
//   @Get()
//   async getAllFeedbacks() {
//     return await this.feedbacksService.getAllFeedbacks();
//   }

//   // feedbacks.controller.ts
//   @Get('sport/:sportId')
//   async getFeedbacksBySport(@Param('sportId') sportId: number) {
//     return await this.feedbacksService.getFeedbacksBySport(sportId);
//   }

//   @Get('most-popular')
//   async getMostPopularSport() {
//     const popularSport = await this.feedbacksService.getMostPopularSport();
//     return popularSport;
//   }
// }
