import { useDecodedToken } from "./useDecodedToken";

export const useAuth = () => {
  const decodedToken = useDecodedToken();

  let isAuthenticated = false;

  if (decodedToken) {
    const currentDate = new Date();

    //tokenが有効期限内か判定
    if (decodedToken.exp * 1000 > currentDate.getTime()) {
      isAuthenticated = true;
    }
  }
  return isAuthenticated;
};
