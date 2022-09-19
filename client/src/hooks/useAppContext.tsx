import React, { useContext } from "react";
import { User } from "../types";

export interface ContextType {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const AppContext = React.createContext<Partial<ContextType>>({});

export function useAppContext() {
  return useContext(AppContext);
}