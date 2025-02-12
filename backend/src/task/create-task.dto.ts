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

  @IsNotEmpty()
  @IsInt()
  statusId: number;

  @IsNotEmpty()
  @IsInt()
  priorityId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
