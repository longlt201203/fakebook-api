import { Module, forwardRef } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, AccountDetail } from '@entities';
import { CryptoModule } from '@crypto';
import { AuthModule } from '@auth';

@Module({
  imports: [
    CryptoModule.register(), 
    TypeOrmModule.forFeature([Account, AccountDetail]), 
    forwardRef(() => AuthModule)
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService]
})
export class AccountsModule {}
