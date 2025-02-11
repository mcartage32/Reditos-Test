import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/user.entity';
import { Task } from './task/task.entity';
import { Status } from './status/status.entity';

dotenv.config();

const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'reditos_test',
  entities: [User, Task, Status],
  synchronize: true,
};

export default dataBaseConfig;
