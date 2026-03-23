import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  userId: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      setUser,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
