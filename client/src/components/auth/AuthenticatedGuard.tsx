import axios from "../../http";
import jwt from "jwt-decode";
import { VFC, ReactNode, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import { LoginUserContext } from "../../providers/LoginUserProvider";
import { DecodedToken } from "../../types/types";
import { Profile } from "../../types/users/profile";

const AuthenticatedGuard: VFC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { setProfile } = useContext(LoginUserContext);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    axios
      .get<string>("http://localhost:3000/auth/getJwt")
      .then((res) => {
        setDecodedToken(jwt(res.data));

        if (decodedToken) {
          const currentDate = new Date();

          //tokenが有効期限内か判定
          if (decodedToken.exp * 1000 > currentDate.getTime()) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        }
      })
      .catch((err) => {
        setIsAuth(false);
      });

    axios
      .get<Profile>(`http://localhost:3000/users/${decodedToken?.email}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [decodedToken, setIsAuth, setProfile]);

  return isAuth ? (
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
