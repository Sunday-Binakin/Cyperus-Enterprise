'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user interface to match the authentication system
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isEmailVerified: boolean;
  password?: string;
  activationToken?: string;
  temporaryPassword?: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  activateAccount: (email: string, activationToken: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  confirmPasswordReset: (email: string, resetToken: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: { firstName?: string; lastName?: string }) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility functions
const generateActivationToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const generateTemporaryPassword = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const generateResetToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Mock email service
const mockEmailService = {
  async sendAccountActivationEmail(data: { email: string; activationToken: string; temporaryPassword: string }): Promise<boolean> {
    if (typeof window === 'undefined') return true;
    
    console.log('📧 Sending activation email to:', data.email);
    console.log('🔑 Activation Token:', data.activationToken);
    console.log('🔐 Temporary Password:', data.temporaryPassword);
    console.log('🔗 Activation URL: http://localhost:3000/activate?email=' + encodeURIComponent(data.email) + '&token=' + data.activationToken);
    
    // Store activation info for simulation
    const activationData = {
      email: data.email,
      token: data.activationToken,
      tempPassword: data.temporaryPassword,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cyperus_last_activation', JSON.stringify(activationData));
    return true;
  },

  async sendPasswordResetEmail(data: { email: string; resetToken: string }): Promise<boolean> {
    if (typeof window === 'undefined') return true;
    
    console.log('📧 Sending password reset email to:', data.email);
    console.log('🔑 Reset Token:', data.resetToken);
    console.log('🔗 Reset URL: http://localhost:3000/reset-password?email=' + encodeURIComponent(data.email) + '&token=' + data.resetToken);
    
    // Store reset info for simulation
    const resetData = {
      email: data.email,
      token: data.resetToken,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cyperus_last_reset', JSON.stringify(resetData));
    return true;
  }
};

// Default mock users
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
    isEmailVerified: true
  },
  {
    id: '2',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    password: 'demo123',
    isEmailVerified: false,
    activationToken: 'demo-token-123',
    temporaryPassword: 'temp123'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log('✅ AuthProvider function executing...');
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load users from localStorage - SSR safe
  const loadUsers = (): User[] => {
    if (typeof window === 'undefined') return [...defaultUsers];
    
    try {
      const saved = localStorage.getItem('cyperus_users');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
    return [...defaultUsers];
  };

  // Save users to localStorage - SSR safe
  const saveUsers = (users: User[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('cyperus_users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  useEffect(() => {
    // Load user from localStorage on mount
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('cyperus_auth_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Sign in attempt:', email);
    
    try {
      const users = loadUsers();
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }
      
      if (!foundUser.isEmailVerified) {
        return { success: false, error: 'Email not verified. Please check your email for activation instructions.' };
      }
      
      if (foundUser.password !== password) {
        return { success: false, error: 'Invalid password' };
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userForState = { ...foundUser };
      delete userForState.password;
      delete userForState.activationToken;
      delete userForState.temporaryPassword;
      delete userForState.resetToken;
      delete userForState.resetTokenExpiry;
      
      setUser(userForState);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cyperus_auth_user', JSON.stringify(userForState));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'An error occurred during sign in' };
    }
  };

  const signOut = () => {
    console.log('👋 Signing out user');
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cyperus_auth_user');
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log('📝 Sign up attempt:', email);
    
    try {
      const users = loadUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'User with this email already exists' };
      }
      
      // Generate activation credentials
      const activationToken = generateActivationToken();
      const temporaryPassword = generateTemporaryPassword();
      
      // Create new user
      const newUser: User = {
        id: (users.length + 1).toString(),
        email,
        firstName,
        lastName,
        password,
        isEmailVerified: false,
        activationToken,
        temporaryPassword
      };
      
      // Save user
      users.push(newUser);
      saveUsers(users);
      
      // Send activation email
      await mockEmailService.sendAccountActivationEmail({
        email,
        activationToken,
        temporaryPassword
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        message: 'Account created successfully! Please check your email for activation instructions.' 
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'An error occurred during sign up' };
    }
  };

  const activateAccount = async (email: string, activationToken: string) => {
    console.log('🔓 Account activation attempt:', email);
    
    try {
      const users = loadUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }
      
      const user = users[userIndex];
      
      if (user.isEmailVerified) {
        return { success: false, error: 'Account is already activated' };
      }
      
      if (user.activationToken !== activationToken) {
        return { success: false, error: 'Invalid activation token' };
      }
      
      // Activate account
      users[userIndex] = {
        ...user,
        isEmailVerified: true,
        activationToken: undefined,
        temporaryPassword: undefined
      };
      
      saveUsers(users);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Account activation error:', error);
      return { success: false, error: 'An error occurred during account activation' };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    console.log('🔑 Password change attempt');
    
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }
    
    try {
      const users = loadUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }
      
      if (users[userIndex].password !== currentPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }
      
      // Update password
      users[userIndex].password = newPassword;
      saveUsers(users);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'An error occurred while changing password' };
    }
  };

  const resetPassword = async (email: string) => {
    console.log('🔄 Password reset request:', email);
    
    try {
      const users = loadUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }
      
      // Generate reset token
      const resetToken = generateResetToken();
      const resetTokenExpiry = Date.now() + (1 * 60 * 60 * 1000); // 1 hour
      
      // Update user with reset token
      users[userIndex] = {
        ...users[userIndex],
        resetToken,
        resetTokenExpiry
      };
      
      saveUsers(users);
      
      // Send reset email
      await mockEmailService.sendPasswordResetEmail({
        email,
        resetToken
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        message: 'Password reset instructions sent to your email' 
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'An error occurred while requesting password reset' };
    }
  };

  const confirmPasswordReset = async (email: string, resetToken: string, newPassword: string) => {
    console.log('✅ Password reset confirmation:', email);
    
    try {
      const users = loadUsers();
      const userIndex = users.findIndex(u => u.email === email);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }
      
      const user = users[userIndex];
      
      if (!user.resetToken || user.resetToken !== resetToken) {
        return { success: false, error: 'Invalid reset token' };
      }
      
      if (!user.resetTokenExpiry || Date.now() > user.resetTokenExpiry) {
        return { success: false, error: 'Reset token has expired' };
      }
      
      // Update password and clear reset token
      users[userIndex] = {
        ...user,
        password: newPassword,
        resetToken: undefined,
        resetTokenExpiry: undefined
      };
      
      saveUsers(users);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      return { success: false, error: 'An error occurred while resetting password' };
    }
  };

  const updateProfile = async (updates: { firstName?: string; lastName?: string }) => {
    console.log('👤 Profile update attempt');
    
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }
    
    try {
      const users = loadUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }
      
      // Update user
      users[userIndex] = {
        ...users[userIndex],
        ...updates
      };
      
      saveUsers(users);
      
      // Update current user state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cyperus_auth_user', JSON.stringify(updatedUser));
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'An error occurred while updating profile' };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    activateAccount,
    changePassword,
    resetPassword,
    confirmPasswordReset,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export AuthProvider as both named and default export
export { AuthProvider as default };
