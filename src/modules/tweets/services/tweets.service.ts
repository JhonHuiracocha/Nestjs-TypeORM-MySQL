import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Observable, from, map, tap, switchMap } from 'rxjs';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { UpdateTweetDto } from '../dto/update-tweet.dto';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private readonly _tweetsRepository: Repository<Tweet>,
  ) {}

  createTweet(createTweetDto: CreateTweetDto): Observable<Tweet> {
    return from(this._tweetsRepository.save(createTweetDto));
  }

  findTweets(): Observable<Tweet[]> {
    return from(
      this._tweetsRepository.find({
        relations: { hashtags: true },
        where: { status: true },
      }),
    );
  }

  findTweetById(id: string): Observable<Tweet> {
    return from(this._tweetsRepository.findOne({ where: { id } })).pipe(
      map((tweet: Tweet) => {
        if (!tweet)
          throw new NotFoundException('The tweet has not been found.');
        return tweet;
      }),
    );
  }

  updateTweetById(
    id: string,
    updateTweetDto: UpdateTweetDto,
  ): Observable<UpdateResult> {
    return from(this._tweetsRepository.findOne({ where: { id } })).pipe(
      tap((tweet: Tweet) => {
        if (!tweet)
          throw new NotFoundException('The tweet has not been found.');
      }),
      switchMap((tweet: Tweet) => {
        return this._tweetsRepository.update(id, updateTweetDto);
      }),
    );
  }

  deleteTweetById(id: string): Observable<UpdateResult> {
    return from(this._tweetsRepository.findOne({ where: { id } })).pipe(
      tap((tweet: Tweet) => {
        if (!tweet)
          throw new NotFoundException('The tweet has not been found.');
      }),
      switchMap((tweet: Tweet) => {
        return this._tweetsRepository.update(id, { status: false });
      }),
    );
  }
}
