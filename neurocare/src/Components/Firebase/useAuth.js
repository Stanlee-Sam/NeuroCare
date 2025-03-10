

import { useContext } from "react";
import { AuthContext } from "./session";


export const useAuth = () => {
  return useContext(AuthContext);
};
