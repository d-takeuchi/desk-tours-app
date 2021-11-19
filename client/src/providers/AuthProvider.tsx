import {
  createContext,
  ReactNode,
  useState,
  VFC,
  Dispatch,
  SetStateAction,
} from "react";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
