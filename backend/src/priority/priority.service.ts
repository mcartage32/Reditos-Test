import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from './priority.entity';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
  ) {}

  async findAll(): Promise<Priority[]> {
    return this.priorityRepository.find();
  }
}
