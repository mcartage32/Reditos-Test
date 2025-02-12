import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import dataBaseConfig from './dataBaseConfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { PriorityModule } from './priority/priority.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    UserModule,
    TaskModule,
    AuthModule,
    StatusModule,
    PriorityModule,
  ],
})
export class AppModule {}
