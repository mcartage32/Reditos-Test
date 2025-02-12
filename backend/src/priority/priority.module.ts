import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './priority.entity';
import { PriorityController } from './priority.controller';
import { PriorityService } from './priority.service';
import { PrioritySeeder } from './priority.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Priority])],
  controllers: [PriorityController],
  providers: [PriorityService, PrioritySeeder],
  exports: [PriorityService],
})
export class PriorityModule {}
