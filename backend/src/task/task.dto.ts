export class CreateTaskDto {
  userId: number;
  title: string;
  description: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
}
