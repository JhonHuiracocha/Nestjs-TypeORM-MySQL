import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TweetHashtag } from './tweet-hashtag.entity';

@Entity({ name: 'tweets' })
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 280, nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgUrl: string;

  @ManyToOne(() => User, (user) => user.tweets, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => TweetHashtag, (tweetHashtag) => tweetHashtag.tweet)
  hashtags: TweetHashtag[];

  @Column({ type: 'tinyint', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
