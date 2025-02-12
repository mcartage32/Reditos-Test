import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: string;

  @IsInt()
  statusId: number;

  @IsInt()
  priorityId: number;

  @IsInt()
  userId: number;
}
