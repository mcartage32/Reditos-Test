import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from './priority.entity';

@Injectable()
export class PrioritySeeder {
  constructor(
    @InjectRepository(Priority)
    private readonly priorityRepository: Repository<Priority>,
  ) {}

  async seedPriorities() {
    const priorities = [{ name: 'Alta' }, { name: 'Media' }, { name: 'Baja' }];
    for (const priority of priorities) {
      const existingPriority = await this.priorityRepository.findOne({
        where: { name: priority.name },
      });
      if (!existingPriority) {
        await this.priorityRepository.save(priority);
      }
    }
  }
}
