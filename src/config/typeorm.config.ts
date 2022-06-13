import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Tweet } from '../modules/tweets/entities/tweet.entity';
import { Hashtag } from '../modules/tweets/entities/hashtag.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs-typeorm',
  entities: [User, Tweet, Hashtag],
  synchronize: true,
};
