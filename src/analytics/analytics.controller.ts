import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('analytics')
@ApiTags('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("friend-recommendation")
  async getFriendRecommendation(@Query("accountId") accountId: string) {
    return this.analyticsService.getFriendsRecommendation(accountId);
  }
}
