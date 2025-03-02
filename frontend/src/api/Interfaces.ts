export interface RegistrationInterface {
  email: string;
  password: string;
  role: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  id: number;
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface TaskInterface {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: {
    name: string;
    id: number;
  };
  priority: {
    name: string;
    id: number;
  };
}

export interface CreateTaskInterface {
  title: string;
  description: string;
  dueDate: string;
  statusId: number;
  priorityId: number;
  userId: number;
}

export interface TaskPartial {
  title?: string;
  description?: string;
  dueDate?: Date;
  statusId?: number;
  priorityId?: number;
}

export interface StatusInterface {
  id: number;
  name: string;
}

export interface PropietyInterface {
  id: number;
  name: string;
}
