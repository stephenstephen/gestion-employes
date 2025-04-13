export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  entryDate: string;
  exitDate: string;
}

export interface EmployeeCreateDTO {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  entryDate: string;
  exitDate: string;
}

export interface EmployeeUpdateDTO {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  entryDate: string;
  exitDate: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  totalCount: number;
}
  
export interface PaginatedResponse<T> {
  items: T[];
  totalPages: number;
  totalCount: number;
}