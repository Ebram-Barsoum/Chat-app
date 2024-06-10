/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import ChatDetails from "./ChatDetails";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import useChats from "../features/chats/useChats";
import { useUserInfo } from "../contexts/userContext";
import SmallLoader from "./SmallLoader";

export default function ActiveChat() {
  const { id } = useParams();
  const { chats, isLoading } = useChats();
  const { user } = useUserInfo();

  if (isLoading) return <SmallLoader />;

  const currentChat = chats.filter((chat) => chat.id == id)[0];
  const friend =
    currentChat?.user1_id === user.id ? currentChat?.user2 : currentChat?.user1;

  return (
    <div className="w-[100%] grid grid-rows-[auto_1fr_auto] h-[100dvh] max-h-[100dvh]">
      <ChatHeader friend={friend} />
      <ChatDetails chatId={id} userId={user.id} />
      <ChatFooter chatId={id} userId={user.id}/>
    </div>
  );
}
