import { AccountsService } from '@accounts';
import { Account } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipsService } from '@relationships';
import { Env } from '@utils';
import { And, In, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>,
        private readonly accountsService: AccountsService,
        private readonly relationshipsService: RelationshipsService
    ) {}

    async getFriendsRecommendation(accountId: string) {
        const [
            account,
            [friends, countFriends],
            requestedPeople
        ] = await Promise.all([
            this.accountsService.findById(accountId, { detail: true }),
            this.relationshipsService.getFriends(accountId, { page: 1, take: Env.MAX_FRIEND_ALLOW }),
            this.relationshipsService.getRequestedPeople(accountId)
        ]);
        return this.accountRepo.find({
            where: {
                id: And(Not(account.id), Not(In(friends.map(item => item.id))), Not(In(requestedPeople.map(item => item.to.id)))),
                detail: {
                    age: And(MoreThanOrEqual(account.detail.age-3), LessThanOrEqual(account.detail.age+3))
                },
            },
            relations: {
                detail: true
            },
            take: 20,
        });
    }
}
