import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet } from './entities/tweet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private readonly _tweetsRepository: Repository<Tweet>,
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this._tweetsRepository.save(createTweetDto);
  }

  async findAll(): Promise<Tweet[]> {
    return await this._tweetsRepository.find({
      relations: { hashtags: true },
      where: { status: true },
    });
  }

  async findOne(id: string): Promise<Tweet> {
    const tweetFound = await this._tweetsRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!tweetFound)
      throw new NotFoundException('The tweet has not been found.');

    return tweetFound;
  }

  async update(id: string, updateTweetDto: UpdateTweetDto): Promise<Tweet> {
    const tweetFound = await this._tweetsRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!tweetFound)
      throw new NotFoundException('The tweet has not been found.');

    const updatedTweet = Object.assign(tweetFound, updateTweetDto);

    return updatedTweet;
  }

  async remove(id: string): Promise<void> {
    const tweetFound = await this._tweetsRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!tweetFound)
      throw new NotFoundException('The tweet has not been found.');

    await this._tweetsRepository.update(id, { status: false });
  }
}
