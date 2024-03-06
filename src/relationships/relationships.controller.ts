import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, CurrentUser } from '@auth';
import { RelationshipFilterDto } from './dto/relationship-filter.dto';
import { DtoMapper, PaginationDto } from '@utils';
import { AccountResponseDto } from '@accounts';
import { Account } from '@entities';

@Controller('relationships')
@ApiTags("relationships")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Get("friends/:accountId")
  async getFriends(@Param("accountId") accountId: string, @Query() filter: RelationshipFilterDto) {
    const [friends, count] = await this.relationshipsService.getFriends(accountId, filter);
    return PaginationDto.from(DtoMapper.mapMany(friends, AccountResponseDto), filter, count);
  }

  @Get("blocked-list/:accountId")
  async getBlockedList(@Param("accountId") accountId: string, @Query() filter: RelationshipFilterDto) {
    const [blockedUsers, count] = await this.relationshipsService.getBlockedList(accountId, filter);
    return PaginationDto.from(DtoMapper.mapMany(blockedUsers, AccountResponseDto), filter, count);
  }

  @Get("add-friend")
  async addFriend(@CurrentUser() account: Account, @Query("accountId") accountId: string) {
    await this.relationshipsService.createFriendRequest(account.id, accountId);
    return { message: "Create friend request successfully!" };
  }

  @Get("accept-friend-request")
  async acceptFriendRequest(@CurrentUser() account: Account, @Query("frId") frId: string) {
    await this.relationshipsService.acceptFriendRequest(account.id, +frId);
    return { message: "Accept friend request successfully!" };
  }

  @Get("unfriend")
  async unfriend(@CurrentUser() account: Account, @Query("friendId") friendId: string) {
    await this.relationshipsService.unfriend(account.id, friendId);
    return { message: "Unfriend successfully!" }; 
  }

  @Get("block")
  async block(@CurrentUser() account: Account, @Query("accountId") accountId: string) {
    await this.relationshipsService.block(account.id, accountId);
    return { message: "Block successfully!" }; 
  }

  @Get("unblock")
  async unblock(@CurrentUser() account: Account, @Query("accountId") accountId: string) {
    await this.relationshipsService.unblock(account.id, accountId);
    return { message: "Unblock successfully!" }; 
  }
}
