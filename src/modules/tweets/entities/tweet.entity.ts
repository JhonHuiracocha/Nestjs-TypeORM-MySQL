import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Hashtag } from './hashtag.entity';

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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.tweets, {
    cascade: true,
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'tweet_hashtags',
    joinColumn: { name: 'tweet_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'hashtag_id', referencedColumnName: 'id' },
  })
  hashtags: Hashtag[];

  @Column({ type: 'tinyint', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
