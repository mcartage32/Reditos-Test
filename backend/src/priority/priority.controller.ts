import { Controller, Get, UseGuards } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('priorities')
@UseGuards(AuthGuard('jwt'))
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  async findAll() {
    return this.priorityService.findAll();
  }
}
