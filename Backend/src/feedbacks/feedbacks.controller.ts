import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { userAuthGuard } from 'src/User/auth/userAuth.guard';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService,
    private readonly jwtService:JwtService,
  ) {}

  @Post('addFeedback')
  @UseGuards(userAuthGuard)
  async addFeedback(
    @Req()req,
    @Body('sportId') sportId: number,
    @Body('comment') comment: string,
    @Body('rating') rating: number,
  ) {
    const token = req.cookies['access_token']; // Or extract it from the Authorization header
    const decodedPayload = await this.jwtService.verifyAsync(token);
    const studentId = decodedPayload.userId;
    return this.feedbacksService.addFeedback(
      studentId,
      sportId,
      comment,
      rating,
    );
  }

  @Get('average-rating/:sportId')
  //@UseGuards(userAuthGuard)
  async getAverageRating(@Param('sportId') sportId: number) {
    return this.feedbacksService.getAverageRating(sportId);
  }

  @Get('sport/:sportId')
  //@UseGuards(userAuthGuard)
  async getFeedbacksForSport(@Param('sportId') sportId: number) {
    return this.feedbacksService.getFeedbacksForSport(sportId);
  }

  @Get()
  //@UseGuards(userAuthGuard)
  async getAllFeedback() {
    return this.feedbacksService.getAllFeedback();
  }
}
