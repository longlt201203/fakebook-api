import { Body, Controller, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('accounts')
@ApiTags("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(dto);
  }
}
