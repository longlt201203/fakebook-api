import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AccountsModule } from './accounts/accounts.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [DbModule, AccountsModule, CryptoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
