/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";

import { useUserInfo } from "../contexts/userContext";
import { useChats } from "../contexts/chatsContext";

import ChatDetails from "./ChatDetails";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import SmallLoader from "./SmallLoader";

export default function ActiveChat() {
  const { id } = useParams();
  const { user } = useUserInfo();
  const { chats, isLoading } = useChats();

  if (isLoading) return <SmallLoader />;

  const currentChat = chats.filter((chat) => chat.id == id)[0];
  const friend =
    currentChat?.user1_id === user?.user?.id
      ? currentChat?.user2
      : currentChat?.user1;

  return (
    <div className="w-[100%] grid grid-rows-[auto_1fr_auto] h-[100dvh] max-h-[100dvh]">
      <ChatHeader friend={friend} />
      <ChatDetails chatId={id} userId={user?.user?.id} />
      <ChatFooter chatId={id} userId={user?.user?.id} />
    </div>
  );
}
