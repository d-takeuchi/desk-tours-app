import { VFC, ReactNode } from "react";
import { Redirect, useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

const AuthenticatedGuard: VFC<{ children: ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

export default AuthenticatedGuard;
