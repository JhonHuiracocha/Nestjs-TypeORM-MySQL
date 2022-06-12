import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tweet } from './tweet.entity';
import { Hashtag } from './hashtag.entity';

@Entity({ name: 'tweet_hashtags' })
export class TweetHashtag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  tweetId: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  hashtagId: string;

  @ManyToOne(() => Tweet, (tweet) => tweet.hashtags, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tweet: Tweet;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.tweets, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hashtag: Hashtag;

  @Column({ type: 'tinyint', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
