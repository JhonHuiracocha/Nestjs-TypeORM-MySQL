import { Module } from '@nestjs/common';
import { TweetsService } from './services/tweets.service';
import { TweetsController } from './controllers/tweets.controller';
import { Tweet } from './entities/tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
