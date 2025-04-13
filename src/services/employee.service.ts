import api from '@/lib/api';
import { Employee, EmployeeCreateDTO, EmployeeUpdateDTO, PaginatedResponse } from '@/types/employee';

// 2. API functions
export const getEmployees = async (
  page = 1, 
  search = ''
): Promise<PaginatedResponse<Employee>> => {
  const response = await api.get('/employees', {
    params: { page, search },
  });

  return {
    items: response.data.data.items,
    totalPages: response.data.data.totalPages || 10,
    totalCount: response.data.data.totalCount || response.data.data.items.length,
  };
};

export const createEmployee = async (
  employeeData: EmployeeCreateDTO
): Promise<Employee> => {
  const { data } = await api.post('/employees', employeeData);
  return data.data;
};

export const updateEmployee = async (
  id: number,
  updates: EmployeeUpdateDTO
): Promise<Employee> => {
  const { data } = await api.put(`/employees/${id}`, updates);
  return data.data;
};

export const deleteEmployee = async (
  id: number
): Promise<{ success: boolean }> => {
  const { data } = await api.delete(`/employees/${id}`);
  return data;
};