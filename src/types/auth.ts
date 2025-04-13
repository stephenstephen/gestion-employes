export interface LoginFormData {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
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