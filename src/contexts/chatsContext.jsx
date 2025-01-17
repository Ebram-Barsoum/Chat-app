/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import useGetChats from "../features/chats/useGetChats";
import { useUserInfo } from "./userContext";
import FullSpinner from "../ui/FullSpinner";

const ChatsContext = createContext(null);

export default function ChatsProvider({ children }) {
  const { user, isLoading: userLoading } = useUserInfo();
  const { chats, isLoading } = useGetChats(user?.user?.id);

  if (userLoading || isLoading) return <FullSpinner />;

  return (
    <ChatsContext.Provider value={{ chats, isLoading }}>
      {children}
    </ChatsContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatsContext);

  if (!context) {
    throw new Error("useChats used outside context");
  }

  return context;
}
