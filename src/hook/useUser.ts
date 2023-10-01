import { useContext } from 'react';
import { UserContext } from '../auth/AuthContext';

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};
