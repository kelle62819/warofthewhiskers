import { createContext, useContext, useState, type ReactNode } from 'react';
import { ADMIN_PASSCODE } from '../utils/constants';

interface AdminContextValue {
  isAdmin: boolean;
  unlock: (code: string) => boolean;
  lock: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  unlock: () => false,
  lock: () => {},
});

const STORAGE_KEY = 'war-admin';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === 'true',
  );

  function unlock(code: string): boolean {
    if (code === ADMIN_PASSCODE) {
      setIsAdmin(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  function lock() {
    setIsAdmin(false);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AdminContext.Provider value={{ isAdmin, unlock, lock }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
