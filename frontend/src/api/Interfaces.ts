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

export type UserWithoutPassword = Omit<UserInterface, "password">;

export interface LoginResponse {
  success: boolean;
  user?: UserWithoutPassword;
}

export interface TaskInterface {
  id: number;
  title: string;
  description: string;
}

export interface CreateTaskInterface {
  userId: number;
  title: string;
  description: string;
}

export interface TaskPartial {
  title?: string;
  description?: string;
}
