
import { UserProfile } from "@/types/shared";

// Simple password hashing (in production, use proper hashing like bcrypt)
export const hashPassword = (password: string): string => {
  // Simple hash for demo purposes - in production use proper hashing
  return btoa(password).split('').reverse().join('');
};

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  const hashedInput = hashPassword(password);
  console.log("Verifying password:", { hashedInput, hashedPassword, match: hashedInput === hashedPassword });
  return hashedInput === hashedPassword;
};

// User registry management
export const saveUserToRegistry = (user: UserProfile & { password: string }): boolean => {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if user already exists
    const existingUser = registeredUsers.find((u: any) => u.email === user.email);
    if (existingUser) {
      console.log("User already exists:", user.email);
      return false; // User already exists
    }
    
    // Hash password before storing
    const userWithHashedPassword = {
      ...user,
      password: hashPassword(user.password)
    };
    
    registeredUsers.push(userWithHashedPassword);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    console.log("User saved to registry successfully:", userWithHashedPassword.email);
    console.log("Total registered users:", registeredUsers.length);
    return true;
  } catch (error) {
    console.error('Error saving user to registry:', error);
    return false;
  }
};

export const getUserFromRegistry = (email: string, password: string): UserProfile | null => {
  console.log("Getting user from registry for email:", email);
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    console.log("Total registered users in storage:", registeredUsers.length);
    console.log("All registered emails:", registeredUsers.map((u: any) => u.email));
    
    const user = registeredUsers.find((u: any) => {
      const emailMatch = u.email.toLowerCase() === email.toLowerCase();
      const passwordMatch = verifyPassword(password, u.password);
      console.log(`Checking user ${u.email}: emailMatch=${emailMatch}, passwordMatch=${passwordMatch}`);
      return emailMatch && passwordMatch;
    });
    
    if (user) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      console.log("User authenticated successfully:", userWithoutPassword.email);
      return userWithoutPassword;
    }
    
    console.log("No matching user found for email:", email);
    return null;
  } catch (error) {
    console.error('Error getting user from registry:', error);
    return null;
  }
};

export const checkEmailExists = (email: string): boolean => {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const exists = registeredUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
    console.log(`Email ${email} exists:`, exists);
    return exists;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};

// Debug function to list all registered users
export const listAllRegisteredUsers = (): void => {
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    console.log("=== ALL REGISTERED USERS ===");
    registeredUsers.forEach((user: any, index: number) => {
      console.log(`${index + 1}. Email: ${user.email}, Role: ${user.role}, Vendor Category: ${user.profile?.vendorCategory || 'N/A'}`);
    });
    console.log("=== END OF LIST ===");
  } catch (error) {
    console.error('Error listing registered users:', error);
  }
};
