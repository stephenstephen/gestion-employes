import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '@/services/employee.service';
import { Employee, PaginatedResponse } from '@/types/employee';

export const useEmployees = (page = 1, search = '') => {
  return useQuery({
    queryKey: ['employees', page, search],
    queryFn: () => getEmployees(page, search),
    placeholderData: (previousData?: PaginatedResponse<Employee>) => previousData,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('404')) return false;
      return failureCount < 3;
    }
  });
};