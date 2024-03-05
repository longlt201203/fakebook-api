import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MyExceptionFilter, ValidationPipe } from '@utils';
import { LocalFilesModule } from './local-files/local-files.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DbModule, AccountsModule, AuthModule, LocalFilesModule, PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
