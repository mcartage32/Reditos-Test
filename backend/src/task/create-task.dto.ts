import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título de la tarea' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Descripción de la tarea' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Fecha de vencimiento',
    example: '2025-02-20T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  dueDate: string;

  @ApiProperty({ description: 'ID del estado' })
  @IsNotEmpty()
  @IsInt()
  statusId: number;

  @ApiProperty({ description: 'ID de la prioridad' })
  @IsNotEmpty()
  @IsInt()
  priorityId: number;

  @ApiProperty({ description: 'ID del usuario asignado' })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
