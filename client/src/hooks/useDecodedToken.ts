import { DecodedToken } from "../types/types";

export const useDecodedToken = () => {
  const token: string | null = localStorage.getItem("app-meta");

  let decodedToken: DecodedToken | null = null;
  if (token) {
    decodedToken = JSON.parse(token);
  }
  return decodedToken;
};
