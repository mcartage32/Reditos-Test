import { Controller, Get } from '@nestjs/common';
import { PriorityService } from './priority.service';

@Controller('priorities')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  async findAll() {
    return this.priorityService.findAll();
  }
}
