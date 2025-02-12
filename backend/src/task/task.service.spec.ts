import { TaskService } from './task.service';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/user.entity';
import { Status } from 'src/status/status.entity';
import { Priority } from 'src/priority/priority.entity';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Partial<Repository<Task>>;
  let statusRepository: Partial<Repository<Status>>;
  let priorityRepository: Partial<Repository<Priority>>;
  let userRepository: Partial<Repository<User>>;

  beforeEach(async () => {
    taskRepository = {
      create: jest.fn().mockImplementation((task) => task), // 👈 Agregar mock de `create`
      save: jest
        .fn()
        .mockImplementation((task) => Promise.resolve({ id: 1, ...task })),
      find: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]),
      findOne: jest
        .fn()
        .mockImplementation(({ where }) =>
          Promise.resolve(
            where.id === 1 ? { id: 1, title: 'Test Task' } : null,
          ),
        ),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    statusRepository = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Pending' }),
    };

    priorityRepository = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'High' }),
    };

    userRepository = {
      findOne: jest.fn().mockResolvedValue({
        id: 1,
        email: 'admin@example.com',
        password: 'hashedpassword',
        role: 'admin',
        tasks: [],
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getRepositoryToken(Task), useValue: taskRepository },
        { provide: getRepositoryToken(Status), useValue: statusRepository },
        { provide: getRepositoryToken(Priority), useValue: priorityRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  //Prueba de creación de tarea
  it('Debe crear una tarea correctamente', async () => {
    const newTask = await taskService.create({
      title: 'Nueva Tarea',
      description: 'Descripción',
      userId: 1,
      dueDate: '2025-09-09',
      priorityId: 1,
      statusId: 1,
    });

    expect(newTask).toHaveProperty('id', 1);
    expect(newTask.title).toBe('Nueva Tarea');
  });

  // Validación de fecha incorrecta
  it('Debe rechazar una tarea con fecha inválida', async () => {
    await expect(
      taskService.create({
        title: 'Nueva Tarea',
        description: 'Descripción',
        userId: 1,
        dueDate: 'fecha-invalida',
        priorityId: 1,
        statusId: 1,
      }),
    ).rejects.toThrow();
  });

  // Validación de estado y prioridad inexistentes
  it('Debe rechazar una tarea con status o prioridad inválidos', async () => {
    jest.spyOn(statusRepository, 'findOne').mockResolvedValue(null);
    await expect(
      taskService.create({
        title: 'Nueva Tarea',
        description: 'Descripción',
        userId: 1,
        dueDate: '2025-09-09',
        priorityId: 1,
        statusId: 99,
      }),
    ).rejects.toThrow();

    jest.spyOn(priorityRepository, 'findOne').mockResolvedValue(null);
    await expect(
      taskService.create({
        title: 'Nueva Tarea',
        description: 'Descripción',
        userId: 1,
        dueDate: '2025-09-09',
        priorityId: 99,
        statusId: 1,
      }),
    ).rejects.toThrow();
  });

  it('Debe actualizar una tarea', async () => {
    const updatedTask = await taskService.update(1, { title: 'Updated Task' });
    expect(updatedTask).toHaveProperty('title', 'Updated Task');
  });

  it('Debe eliminar una tarea', async () => {
    await expect(taskService.remove(1)).resolves.toBeUndefined();
  });

  it('Debe obtener una lista de tareas', async () => {
    const userAdmin: User = {
      id: 1,
      email: 'admin@example.com',
      password: 'hashedpassword',
      role: 'admin',
      tasks: [],
    };

    const userNormal: User = {
      id: 2,
      email: 'user@example.com',
      password: 'hashedpassword',
      role: 'user',
      tasks: [],
    };

    const task1 = new Task();
    task1.id = 1;
    task1.title = 'Tarea 1';
    task1.description = 'Descripción de la tarea 1';
    task1.user = userNormal;

    const task2 = new Task();
    task2.id = 2;
    task2.title = 'Tarea 2';
    task2.description = 'Descripción de la tarea 2';
    task2.user = userNormal;

    jest.spyOn(taskRepository, 'find').mockResolvedValue([task1, task2]);

    const resultAdmin = await taskService.findAll(userAdmin);
    expect(resultAdmin).toEqual([task1, task2]);

    jest.spyOn(taskRepository, 'find').mockResolvedValue([task1]);
    const resultUser = await taskService.findAll(userNormal);
    expect(resultUser).toEqual([task1]);
  });
});
