import {
  createContext,
  ReactNode,
  useState,
  VFC,
  Dispatch,
  SetStateAction,
} from "react";

import { Profile } from "../types/users/profile";

type LoginUserContextType = {
  profile: Profile | null;
  setProfile: Dispatch<SetStateAction<Profile | null>>;
};

export const LoginUserContext = createContext({} as LoginUserContextType);

export const LoginUserProvider: VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <LoginUserContext.Provider value={{ profile, setProfile }}>
      {children}
    </LoginUserContext.Provider>
  );
};
