import { Account, AccountRelationship, FriendRequest } from '@entities';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { AccountRelationshipType } from '@utils';
import { RelationshipFilterDto } from './dto/relationship-filter.dto';
import { FriendRequestFilterDto } from './dto/friend-request-filter.dto';

@Injectable()
export class RelationshipsService {
    constructor(
        @InjectRepository(AccountRelationship)
        private readonly accountRelationshipRepo: Repository<AccountRelationship>,
        @InjectRepository(FriendRequest)
        private readonly friendRequestRepo: Repository<FriendRequest>
    ) {}

    async createFriendRequest(fromId: string, toId: string) {
        if (fromId == toId) {
            throw new BadRequestException("Cannot send friend request to yourself!");
        }
        const isRelationshipExisted = await this.accountRelationshipRepo.exists({
            where: [{ accountA: { id: fromId }, accountB: { id: toId } }, { accountA: { id: toId }, accountB: { id: fromId } }]
        });
        if (isRelationshipExisted) {
            throw new BadRequestException("Cannot send request to this user!");
        }
        const fr = this.friendRequestRepo.create({
            from: {
                id: fromId
            },
            to: {
                id: toId
            }
        });
        return this.friendRequestRepo.save(fr);
    }

    removeFriendRequest(id: number) {
        return this.friendRequestRepo.delete({ id: id });
    }

    createRelationShip(dto: CreateRelationshipDto) {
        const relationship = this.accountRelationshipRepo.create({
            accountA: {
                id: dto.accountA
            },
            accountB: {
                id: dto.accountB
            },
            type: dto.type
        });
        return this.accountRelationshipRepo.save(relationship);
    }

    removeRelationship(id: number) {
        return this.accountRelationshipRepo.delete(id);
    }

    findRelationship(accountA: string, accountB: string, type?: AccountRelationshipType) {
        return this.accountRelationshipRepo.findOne({
            where: [
                {
                    accountA: {
                        id: accountA
                    },
                    accountB: {
                        id: accountB
                    },
                    type: type
                },
                {
                    accountA: {
                        id: accountB
                    },
                    accountB: {
                        id: accountA
                    },
                    type: type
                }
            ]
        });
    }

    async acceptFriendRequest(accountId: string, id: number) {
        const fr = await this.friendRequestRepo.findOne({ where: { id: id, to: { id: accountId } } });
        if (!fr) {
            throw new NotFoundException("Friend request not found");
        }
        const results = await Promise.all([
            this.createRelationShip({ accountA: accountId, accountB: fr.to.id, type: AccountRelationshipType.FRIEND }),
            this.removeFriendRequest(id)
        ]);
        return results[0];
    }

    async unfriend(accountId: string, friendId: string) {
        const relationship = await this.findRelationship(accountId, friendId, AccountRelationshipType.FRIEND);
        if (!relationship) {
            throw new NotFoundException("Cannot find relationship between 2 accounts");
        }
        return this.removeRelationship(relationship.id);
    }

    async block(accountA: string, accountB: string) {
        if (accountA == accountB) {
            throw new BadRequestException("Cannot block yourself!");
        }
        let relationship = await this.findRelationship(accountA, accountB);
        if (relationship) {
            relationship.type = AccountRelationshipType.BLOCKED;
        } else {
            relationship = this.accountRelationshipRepo.create({
                accountA: {
                    id: accountA
                },
                accountB: {
                    id: accountB
                },
                type: AccountRelationshipType.BLOCKED
            });
        }
        return this.accountRelationshipRepo.save(relationship);
    }

    async unblock(accountA: string, accountB: string) {
        const relationship = await this.findRelationship(accountA, accountB, AccountRelationshipType.BLOCKED);
        if (!relationship) {
            throw new NotFoundException("Cannot find relationship between 2 accounts");
        }
        return this.removeRelationship(relationship.id);
    }

    async getFriends(accountId: string, dto: RelationshipFilterDto): Promise<[Account[], number]> {
        const [relationships, count] = await this.accountRelationshipRepo.findAndCount({
            where: [
                {
                    accountA: {
                        id: accountId,

                    },
                    type: AccountRelationshipType.FRIEND
                },
                {
                    accountB: {
                        id: accountId
                    },
                    type: AccountRelationshipType.FRIEND
                }
            ],
            relations: {
                accountA: {
                    detail: true
                },
                accountB: {
                    detail: true
                }
            },
            take: dto.take,
            skip: dto.take*(dto.page-1)
        });
        const friends = relationships.map(item => item.accountA.id == accountId ? item.accountB : item.accountA);
        return [friends, count];
    }

    async getBlockedList(accountId: string, dto: RelationshipFilterDto): Promise<[Account[], number]> {
        const [relationships, count] = await this.accountRelationshipRepo.findAndCount({
            where: [
                {
                    accountA: {
                        id: accountId
                    },
                    type: AccountRelationshipType.BLOCKED
                }
            ],
            relations: {
                accountB: {
                    detail: true
                }
            },
            take: dto.take,
            skip: dto.take*(dto.page-1)
        });
        const blockedUsers = relationships.map(item => item.accountB);
        return [blockedUsers, count];
    }

    getFriendRequests(accountId: string, dto: FriendRequestFilterDto) {
        return this.friendRequestRepo.findAndCount({ where: { to: { id: accountId } }, relations: { from: { detail: true } }, take: dto.take, skip: dto.take*(dto.page-1) });
    }
}
