import { Account } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Repository } from 'typeorm';
import { ValidationError } from 'class-validator';
import { MyValidationError } from '@errors';
import { CryptoService } from '@crypto';

@Injectable()
export class AccountsService {
    constructor(
        private readonly cryptoService: CryptoService,
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>,
    ) {}

    async createAccount(dto: CreateAccountDto) {
        const errors: Array<ValidationError> = [];
        
        const results = await Promise.all([
            this.accountRepo.exists({ where: { username: dto.username } })
        ]);

        if (results[0]) {
            const error = new ValidationError();
            error.property = "username";
            error.constraints = { isUnique: "Username already existed!" };
            errors.push(error);
        }

        if (errors.length > 0) {
            throw new MyValidationError(errors);
        }

        const account = await this.accountRepo.save(this.accountRepo.create({
            username: dto.username,
            // RSA-SHA256
            password: this.cryptoService.signSomething(dto.password),
            // HMAC-SHA256
            // password: this.cryptoService.hmacSomething(dto.password),
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

    async findById(accountId: string) {
        const account = await this.accountRepo.findOne({ where: { id: accountId } });
        if (!account) {
            throw new NotFoundException("Account not found");
        }
        return account;
    }
}
