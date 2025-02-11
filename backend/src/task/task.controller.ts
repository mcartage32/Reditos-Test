import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Task[]> {
    return this.taskService.findByIdUser(userId);
  }

  @Get(':id')
  findByOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findByOne(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdate: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, partialUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.taskService.delete(id);
  }
}
