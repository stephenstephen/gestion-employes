export interface LoginFormData {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
  }

  export interface User {
    id: string;
    username: string;
  }

  export interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
  }
  
  export interface ApiError {
    statusCode: number;
    message: string;
    errors?: Record<string, string[]>;
  }