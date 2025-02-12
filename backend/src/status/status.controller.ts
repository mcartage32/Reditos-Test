import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('statuses')
@UseGuards(AuthGuard('jwt'))
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async findAll() {
    return this.statusService.findAll();
  }
}
