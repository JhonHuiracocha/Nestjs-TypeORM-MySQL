import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tweet } from '../../tweets/entities/tweet.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgUrl: string;

  @Column({ type: 'tinyint', default: true })
  status: boolean;

  @OneToMany(() => Tweet, (tweet) => tweet.user, {
    nullable: false,
  })
  tweets: Tweet[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
