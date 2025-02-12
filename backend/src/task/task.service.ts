import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const { title, description, dueDate, priorityId, statusId, userId } =
      createTaskDto;

    // 🚨 Validación de fecha
    if (isNaN(Date.parse(dueDate))) {
      throw new BadRequestException('La fecha proporcionada no es válida');
    }

    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });
    if (!status) throw new NotFoundException('Estado no encontrado');

    const priority = await this.priorityRepository.findOne({
      where: { id: priorityId },
    });
    if (!priority) throw new NotFoundException('Prioridad no encontrada');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // Crear la tarea
    const task = this.taskRepository.create({
      title,
      description,
      dueDate,
      priority,
      status,
      user,
    });

    return this.taskRepository.save(task);
  }

  async findAll(user: any): Promise<Task[]> {
    if (user.role == 'admin') {
      return this.taskRepository.find({
        relations: ['status', 'priority', 'user'],
      });
    }
    return this.taskRepository.find({
      where: { user: { id: user.id } },
      relations: ['status', 'priority'],
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

    if (updateTaskDto.statusId) {
      const status = await this.statusRepository.findOne({
        where: { id: updateTaskDto.statusId },
      });
      if (!status) {
        throw new Error('Invalid status ID');
      }
      task.status = status;
    }

    if (updateTaskDto.priorityId) {
      const priority = await this.priorityRepository.findOne({
        where: { id: updateTaskDto.priorityId },
      });
      if (!priority) {
        throw new Error('Invalid priority ID');
      }
      task.priority = priority;
    }

    // Actualiza solo las propiedades que realmente están en updateTaskDto
    delete updateTaskDto.statusId;
    delete updateTaskDto.priorityId;
    Object.assign(task, updateTaskDto);

    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
