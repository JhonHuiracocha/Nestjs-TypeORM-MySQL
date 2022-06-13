import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UpdateResult } from 'typeorm';
import { TweetsService } from '../services/tweets.service';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { Tweet } from '../entities/tweet.entity';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto): Observable<Tweet> {
    return this.tweetsService.createTweet(createTweetDto);
  }

  @Get()
  findAll(): Observable<Tweet[]> {
    return this.tweetsService.findTweets();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Tweet> {
    return this.tweetsService.findTweetById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ): Observable<UpdateResult> {
    return this.tweetsService.updateTweetById(id, updateTweetDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<UpdateResult> {
    return this.tweetsService.deleteTweetById(id);
  }
}
