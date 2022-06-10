import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../modules/tasks/entities/task.entity';
import { User } from '../modules/users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs-typeorm',
  entities: [Task, User],
  synchronize: true,
};
