import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api, setCurrentApiUserId } from '../lib/api';

interface AuthContextType {
  currentUser: User | null;
  allUsers: User[];
  loading: boolean;
  switchUser: (userId: string) => void;
  // Role checks
  isGuru: boolean;
  isKoordinator: boolean;
  isKonselor: boolean;
  isAdmin: boolean;
  isPimpinan: boolean;
  // Permission checks
  canWriteObservations: boolean;
  canManageSupportPlans: boolean;
  canConductReview: boolean;
  canChangeTier: boolean;
  canManageUsers: boolean;
  canEditConfig: boolean;
  canViewAuditTrail: boolean;
  refreshUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const users = await api.getUsers();
      setAllUsers(users);
      
      const savedUserId = localStorage.getItem('mtss_active_user_id') || users[0]?.id;
      const initialUser = users.find(u => u.id === savedUserId) || users[0];
      
      if (initialUser) {
        setCurrentUser(initialUser);
        setCurrentApiUserId(initialUser.id);
      }
    } catch (err) {
      console.error('Failed to load users for auth', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const switchUser = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
      setCurrentApiUserId(target.id);
      localStorage.setItem('mtss_active_user_id', target.id);
    }
  };

  const role = currentUser?.role;

  const isGuru = role === 'guru';
  const isKoordinator = role === 'koordinator_mtss';
  const isKonselor = role === 'konselor';
  const isAdmin = role === 'admin';
  const isPimpinan = role === 'pimpinan';

  const canWriteObservations = isGuru || isKoordinator || isKonselor;
  const canManageSupportPlans = isGuru || isKoordinator || isKonselor || isAdmin;
  const canConductReview = isKoordinator || isKonselor || isAdmin;
  const canChangeTier = isKoordinator || isAdmin;
  const canManageUsers = isAdmin;
  const canEditConfig = isAdmin || isKoordinator;
  const canViewAuditTrail = isAdmin || isKoordinator || isPimpinan;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        loading,
        switchUser,
        isGuru,
        isKoordinator,
        isKonselor,
        isAdmin,
        isPimpinan,
        canWriteObservations,
        canManageSupportPlans,
        canConductReview,
        canChangeTier,
        canManageUsers,
        canEditConfig,
        canViewAuditTrail,
        refreshUsers: fetchInitialData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
