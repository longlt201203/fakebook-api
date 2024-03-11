import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@entities';
import { AccountsModule } from '@accounts';
import { RelationshipsModule } from '@relationships';

@Module({
  imports: [AccountsModule, TypeOrmModule.forFeature([Account]), RelationshipsModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
