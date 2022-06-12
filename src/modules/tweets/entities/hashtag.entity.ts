import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TweetHashtag } from './tweet-hashtag.entity';

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  content: string;
  
  @OneToMany(() => TweetHashtag, (tweetHashtag) => tweetHashtag.hashtag)
  tweets: TweetHashtag[];

  @Column({ type: 'tinyint', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
