// src/utils/validation.ts

// Validate email format
export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  // Validate if a password meets basic requirements (e.g., minimum 8 characters)
  export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, including letters and numbers
    return regex.test(password);
  };
  
  // Validate if a string is not empty
  export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };
  