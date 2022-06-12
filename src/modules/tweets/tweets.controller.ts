import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto): Promise<Tweet> {
    return this.tweetsService.create(createTweetDto);
  }

  @Get()
  findAll(): Promise<Tweet[]> {
    return this.tweetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tweet> {
    return this.tweetsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    return this.tweetsService.update(id, updateTweetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tweetsService.remove(id);
  }
}
