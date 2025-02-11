import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import dataBaseConfig from './dataBaseConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataBaseConfig), UserModule, TaskModule],
})
export class AppModule {}
