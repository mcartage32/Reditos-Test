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
    const statuses = [
      { name: 'Pendiente' },
      { name: 'En progreso' },
      { name: 'Completada' },
    ];
    for (const status of statuses) {
      const existingStatus = await this.statusRepository.findOne({
        where: { name: status.name },
      });
      if (!existingStatus) {
        await this.statusRepository.save(status);
      }
    }
  }
}
