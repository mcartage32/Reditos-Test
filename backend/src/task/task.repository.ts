import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { User } from '../user/user.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findTasksByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findTaskById(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { userId, title, description } = createTaskDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newTask = this.taskRepository.create({
      title,
      description,
      user,
    });

    return await this.taskRepository.save(newTask);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    let task = await this.taskRepository.preload({ id, ...updateTaskDto });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return await this.taskRepository.save(task);
  }

  async deleteTask(taskId: number): Promise<void> {
    const result = await this.taskRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
  }
}
