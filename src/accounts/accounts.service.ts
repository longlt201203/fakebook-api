import { Account, AccountDetail } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { FindOptionsRelations, Not, Repository } from 'typeorm';
import { ValidationError } from 'class-validator';
import { MyValidationError } from '@errors';
import { CryptoService } from '@crypto';
import { AccountDetailDto } from './dto/account-detail.dto';

@Injectable()
export class AccountsService {
    constructor(
        private readonly cryptoService: CryptoService,
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>,
        @InjectRepository(AccountDetail)
        private readonly accountDetailRepo: Repository<AccountDetail>
    ) {}

    async validateDetail(dto: AccountDetailDto, accountId?: string) {
        const errors: Array<ValidationError> = [];

        const results = await Promise.all([
            accountId ? this.accountRepo.exists({ where: { id: Not(accountId), detail: { email: dto.email } } }) : this.accountRepo.exists({ where: { detail: { email: dto.email } } }),
        ]);

        if (results[0]) {
            const error = new ValidationError();
            error.property = "email";
            error.constraints = { isUnique: "Email already existed!" };
            errors.push(error);
        }

        return errors;
    }

    async createAccount(dto: CreateAccountDto) {
        const errors: Array<ValidationError> = [];
        
        const results = await Promise.all([
            this.accountRepo.exists({ where: { username: dto.username } }),
            dto.detail ? this.validateDetail(dto.detail) : []
        ]);

        if (results[0]) {
            const error = new ValidationError();
            error.property = "username";
            error.constraints = { isUnique: "Username already existed!" };
            errors.push(error);
        }

        errors.push(...results[1]);

        if (errors.length > 0) {
            throw new MyValidationError(errors);
        }

        const account = await this.accountRepo.save(this.accountRepo.create({
            username: dto.username,
            // RSA-SHA256
            password: this.cryptoService.signSomething(dto.password),
            // HMAC-SHA256
            // password: this.cryptoService.hmacSomething(dto.password),
            detail: dto.detail ? this.accountDetailRepo.create({...dto.detail}) : undefined
        }));

        return account;
    }

    async findByUsername(username: string) {
        const account = await this.accountRepo.findOne({ where: { username: username } });
        if (!account) {
            throw new NotFoundException("Account not found");
        }
        return account;
    }

    async findById(accountId: string, relations?: FindOptionsRelations<Account>) {
        const account = await this.accountRepo.findOne({ where: { id: accountId }, relations: relations });
        if (!account) {
            throw new NotFoundException("Account not found");
        }
        return account;
    }

    async updateDetail(accountId: string, dto: AccountDetailDto) {
        const account = await this.findById(accountId, { detail: true });
        
        const errors = await this.validateDetail(dto, accountId);
        if (errors.length > 0) {
            throw new MyValidationError(errors);
        }

        if (account.detail) {
            const detailId = account.detail.id;
            account.detail = { ...account.detail, ...dto, id: detailId };
        } else {
            account.detail = this.accountDetailRepo.create({ ...dto });
        }

        return await this.accountRepo.save(account);
    }

    async findByEmail(email: string, relations?: FindOptionsRelations<Account>) {
        const account = await this.accountRepo.findOne({ where: { detail: { email: email } }, relations: relations });
        if (!account) {
            throw new NotFoundException("Account not found");
        }
        return account;
    }
}
