import React from 'react';
import { useUserData } from '../../hooks/useUserData';

export interface IUserContextData {
  name?: string;
  iconImg?: string;
}

// контекст - это глобальная переменная и он обновляется в том случае,
// когда мы передали ему новый объект в качестве value
export const userContext = React.createContext<IUserContextData>({});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { data, loading } = useUserData();

  return (
    <userContext.Provider value={data}>
      {children}
    </userContext.Provider>
  )
}