import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { TweetsModule } from './modules/tweets/tweets.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, TweetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
