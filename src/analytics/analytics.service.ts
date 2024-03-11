import { AccountsService } from '@accounts';
import { Account } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipsService } from '@relationships';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>,
        private readonly accountsService: AccountsService,
        private readonly relationshipsService: RelationshipsService
    ) {}

    async getFriendsRecommendation(accountId: string) {
        const account = await this.accountsService.findById(accountId, { detail: true });
        // this.relationshipsService.getFriends(accountId)

    }
}
