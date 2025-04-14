import api from "@/lib/api";
import { User } from "@/types/auth";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');

  return response.data.data
};