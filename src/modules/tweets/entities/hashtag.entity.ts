import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity({ name: 'hashtags' })
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  content: string;

  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags)
  tweets: Tweet[];

  @Column({ type: 'tinyint', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
