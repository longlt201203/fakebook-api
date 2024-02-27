import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountDetailDto } from './dto/account-detail.dto';
import { AuthGuard, ForRoles, Role, RoleGuard } from '@auth';
import { DtoMapper, PaginationDto, Request } from '@utils';
import { AccountResponseDto } from './dto/account-response.dto';
import { AccountFilterDto } from './dto/account-filter.dto';

@Controller('accounts')
@ApiTags("accounts")
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
  ) {}

  @Get(":id")
  async getAccountById(@Param("id") id: string) {
    return DtoMapper.mapOne(await this.accountsService.findById(id, { detail: true }), AccountResponseDto);
  }

  @Get()
  @ForRoles([Role.ADMIN])
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth()
  async getAllAccounts(@Query() dto: AccountFilterDto) {
    const [accounts, count] = await this.accountsService.findAll(dto);
    return PaginationDto.from(DtoMapper.mapMany(accounts, AccountResponseDto), dto, count);
  }

  @Post()
  async createAccount(@Body() dto: CreateAccountDto) {
    return DtoMapper.mapOne(await this.accountsService.createAccount(dto), AccountResponseDto);
  }

  @Put("detail")
  @ForRoles([Role.ADMIN, Role.USER])
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth()
  async updateAccountDetail(@Req() req: Request, @Body() dto: AccountDetailDto) {
    return DtoMapper.mapOne(await this.accountsService.updateDetail(req.account.id, dto), AccountResponseDto);
  }
}
