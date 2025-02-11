import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly noteRepository: TaskRepository) {}

  findByIdUser(userId: number): Promise<Task[]> {
    return this.noteRepository.findTasksByUserId(userId);
  }

  async findByOne(id: number) {
    return this.noteRepository.findTaskById(id);
  }

  create(task: CreateTaskDto): Promise<Task> {
    return this.noteRepository.createTask(task);
  }

  async updateTask(id: number, partialUpdate: UpdateTaskDto): Promise<Task> {
    const task = await this.noteRepository.updateTask(id, partialUpdate);
    if (!task) {
      throw new NotFoundException('Note not found or not authorized');
    }
    return task;
  }

  delete(id: number): Promise<void> {
    return this.noteRepository.deleteTask(id);
  }
}
