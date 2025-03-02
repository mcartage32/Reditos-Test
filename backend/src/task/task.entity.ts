import { Priority } from 'src/priority/priority.entity';
import { Status } from 'src/status/status.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @ManyToOne(() => Status, (status) => status.tasks)
  status: Status;

  @ManyToOne(() => Priority, (priority) => priority.tasks)
  priority: Priority;
}
