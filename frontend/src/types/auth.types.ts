// src/types/auth.types.ts

// Type for the user object
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  // Type for the login request payload
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  // Type for the response after login, which includes the user and token
  export interface LoginResponse {
    user: User;
    token: string;
  }
  
  // Type for the register request payload
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }
  