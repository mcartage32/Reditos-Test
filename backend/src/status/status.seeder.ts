import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusSeeder {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async seedStatus() {
    const statuses = ['Pendiente', 'En progreso', 'Completada'];
    for (const name of statuses) {
      const status = this.statusRepository.create({ name });
      await this.statusRepository.save(status);
    }
  }
}
