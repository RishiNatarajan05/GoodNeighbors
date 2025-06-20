import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Organization } from '../types';

interface AuthContextType {
  currentUser: User | null;
  currentOrganization: Organization | null;
  userType: 'volunteer' | 'organization' | null;
  login: (user: User | Organization, type: 'volunteer' | 'organization') => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateOrganization: (org: Organization) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [userType, setUserType] = useState<'volunteer' | 'organization' | null>(null);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem('currentUser');
    const storedOrg = localStorage.getItem('currentOrganization');
    const storedType = localStorage.getItem('userType');

    if (storedUser && storedType === 'volunteer') {
      setCurrentUser(JSON.parse(storedUser));
      setUserType('volunteer');
    } else if (storedOrg && storedType === 'organization') {
      setCurrentOrganization(JSON.parse(storedOrg));
      setUserType('organization');
    }
  }, []);

  const login = (user: User | Organization, type: 'volunteer' | 'organization') => {
    if (type === 'volunteer') {
      setCurrentUser(user as User);
      setCurrentOrganization(null);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      setCurrentOrganization(user as Organization);
      setCurrentUser(null);
      localStorage.setItem('currentOrganization', JSON.stringify(user));
    }
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentOrganization(null);
    setUserType(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentOrganization');
    localStorage.removeItem('userType');
  };

  const updateUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const updateOrganization = (org: Organization) => {
    setCurrentOrganization(org);
    localStorage.setItem('currentOrganization', JSON.stringify(org));
  };

  const value: AuthContextType = {
    currentUser,
    currentOrganization,
    userType,
    login,
    logout,
    updateUser,
    updateOrganization,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 