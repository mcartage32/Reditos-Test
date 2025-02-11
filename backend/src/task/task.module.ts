import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TaskRepository, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
