import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Status } from '../status/status.entity';
import { Priority } from '../priority/priority.entity';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const status = await this.statusRepository.findOne({
      where: { id: createTaskDto.statusId },
    });
    const priority = await this.priorityRepository.findOne({
      where: { id: createTaskDto.priorityId },
    });
    const user = await this.userRepository.findOne({
      where: { id: createTaskDto.userId },
    });

    if (!status || !priority || !user) {
      throw new Error('Invalid status or priority or user');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      status,
      priority,
      user,
    });
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['status', 'priority', 'user'],
    });
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['status', 'priority', 'user'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }

    const status = await this.statusRepository.findOne({
      where: { id: updateTaskDto.statusId },
    });
    const priority = await this.priorityRepository.findOne({
      where: { id: updateTaskDto.priorityId },
    });

    if (!status || !priority) {
      throw new Error('Invalid status or priority ID');
    }

    Object.assign(task, updateTaskDto, { status, priority });
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
