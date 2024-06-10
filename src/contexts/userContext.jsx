/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from "react";
import useUser from "../features/users/useUser";

const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const { user } = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserInfo() {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext used outside of the scope");

  return context;
}
