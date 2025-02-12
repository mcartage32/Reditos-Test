import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Nuevo título de la tarea' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Nueva descripción de la tarea' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Nueva fecha de vencimiento',
    example: '2025-02-20T00:00:00.000Z',
  })
  @IsString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({ description: 'Nuevo estado de la tarea' })
  @IsInt()
  @IsOptional()
  statusId?: number;

  @ApiPropertyOptional({ description: 'Nueva prioridad de la tarea' })
  @IsInt()
  @IsOptional()
  priorityId?: number;
}
