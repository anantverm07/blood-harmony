import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'donor' | 'receiver' | 'hospital' | 'ngo';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isPremium: boolean;
  phone?: string;
  bloodGroup?: string;
  location?: string;
  points?: number;
  donations?: number;
  badge?: 'bronze' | 'silver' | 'gold';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('blood-bridge-user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login - in production, this would hit an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'donor',
      isPremium: false,
      points: 150,
      donations: 2,
      badge: 'bronze',
    };
    
    setUser(demoUser);
    localStorage.setItem('blood-bridge-user', JSON.stringify(demoUser));
  };

  const signup = async (data: SignupData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      isPremium: false,
      phone: data.phone,
      points: 0,
      donations: 0,
    };
    
    setUser(newUser);
    localStorage.setItem('blood-bridge-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blood-bridge-user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('blood-bridge-user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
