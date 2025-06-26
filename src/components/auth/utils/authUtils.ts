
import { UserProfile } from "@/types/shared";

// Simple password hashing (in production, use proper hashing like bcrypt)
export const hashPassword = (password: string): string => {
  // Simple hash for demo purposes - in production use proper hashing
  return btoa(password).split('').reverse().join('');
};

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

// User registry management
export const saveUserToRegistry = (user: UserProfile & { password: string }): boolean => {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    const existingUser = registeredUsers.find((u: any) => u.email === user.email);
    if (existingUser) {
      return false; // User already exists
    }
    
    // Hash password before storing
    const userWithHashedPassword = {
      ...user,
      password: hashPassword(user.password)
    };
    
    registeredUsers.push(userWithHashedPassword);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    return true;
  } catch (error) {
    console.error('Error saving user to registry:', error);
    return false;
  }
};

export const getUserFromRegistry = (email: string, password: string): UserProfile | null => {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find((u: any) => 
      u.email === email && verifyPassword(password, u.password)
    );
    
    if (user) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user from registry:', error);
    return null;
  }
};

export const checkEmailExists = (email: string): boolean => {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    return registeredUsers.some((u: any) => u.email === email);
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};
