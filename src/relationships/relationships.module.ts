import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRelationship, FriendRequest } from '@entities';
import { AuthModule } from '@auth';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRelationship, FriendRequest]), AuthModule],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
  exports: [RelationshipsService]
})
export class RelationshipsModule {}
