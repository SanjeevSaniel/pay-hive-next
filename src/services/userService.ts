import axios from 'axios';
import { User } from '@/types/types';

export const getUsers = async (): Promise<{ data: User[] }> => {
  return await axios.get('/api/users');
};

export const getUserById = async (id: string): Promise<{ data: User }> => {
  return await axios.get(`/api/users/${id}`);
};

export const createUser = async (userData: User): Promise<{ data: User }> => {
  return await axios.post('/api/users', userData);
};
