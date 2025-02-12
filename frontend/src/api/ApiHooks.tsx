import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateTaskInterface,
  LoginInterface,
  LoginResponse,
  PropietyInterface,
  RegistrationInterface,
  StatusInterface,
  TaskInterface,
  TaskPartial,
  UserInterface,
} from "./Interfaces";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const apiTaks = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useCreateUserMutation = () => {
  return useMutation({
    mutationKey: ["CreateUser"],
    mutationFn: async (sendData: RegistrationInterface) => {
      const response = await apiTaks.post<UserInterface>(
        `auth/register`,
        sendData
      );
      return response.data;
    },
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationKey: ["LoginUser"],
    mutationFn: async (sendData: LoginInterface) => {
      const response = await apiTaks.post<LoginResponse>(
        `auth/login`,
        sendData
      );
      return response.data;
    },
  });
};

export const useTaskListQuery = () => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useQuery<TaskInterface[]>({
    queryKey: ["TaskList", token],
    queryFn: async (): Promise<TaskInterface[]> => {
      if (!token) return Promise.reject("No hay token disponible");
      const response = await apiTaks.get<TaskInterface[]>("tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const useCreateTaskMutation = () => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useMutation({
    mutationKey: ["TaskCreate"],
    mutationFn: async (sendData: CreateTaskInterface) => {
      const response = await apiTaks.post<TaskInterface>(`tasks`, sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const useTaskDetailQuery = (id: Number) => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useQuery<TaskInterface>({
    queryKey: ["TaskDetail"],
    queryFn: async (): Promise<TaskInterface> => {
      const response = await apiTaks.get<TaskInterface>(`tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const useUpdateTaskMutation = () => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useMutation({
    mutationKey: ["UpdateNote"],
    mutationFn: async ({
      sendData,
      taskId,
    }: {
      sendData: TaskPartial;
      taskId: number;
    }) => {
      const response = await apiTaks.put<TaskInterface>(
        `tasks/${taskId}`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });
};

export const useDeleteTaskMutation = () => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useMutation({
    mutationKey: ["DeleteTask"],
    mutationFn: async ({ taskId }: { taskId: number }) => {
      const response = await apiTaks.delete(`tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const useStatusListQuery = () => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useQuery<StatusInterface[]>({
    queryKey: ["StatusList", token],
    queryFn: async (): Promise<StatusInterface[]> => {
      if (!token) return Promise.reject("No hay token disponible");
      const response = await apiTaks.get<StatusInterface[]>("statuses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const usePropietyListQuery = () => {
  const auth = useContext(AuthContext);
  const token = auth?.accesToken;
  return useQuery<PropietyInterface[]>({
    queryKey: ["PropietyList", token],
    queryFn: async (): Promise<PropietyInterface[]> => {
      if (!token) return Promise.reject("No hay token disponible");
      const response = await apiTaks.get<PropietyInterface[]>("priorities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
