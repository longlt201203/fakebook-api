import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccountDetailDto } from './dto/account-detail.dto';

@Controller('accounts')
@ApiTags("accounts")
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(@Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(dto);
  }

  @Put("detail/:id")
  updateAccountDetail(@Param("id") id: string, @Body() dto: AccountDetailDto) {
    return this.accountsService.updateDetail(id, dto);
  }
}
