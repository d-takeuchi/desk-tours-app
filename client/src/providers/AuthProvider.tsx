import {
  createContext,
  ReactNode,
  useState,
  VFC,
  Dispatch,
  SetStateAction,
} from "react";

import { useAuth } from "../hooks/useAuth";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(useAuth());

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
