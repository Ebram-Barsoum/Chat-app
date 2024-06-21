/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import { useUserInfo } from "../../contexts/userContext";
import { useChats } from "../../contexts/chatsContext";
import { formatDate } from "../../utils/helper";

import Chat from "../../ui/Chat";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import SmallLoader from "../../ui/SmallLoader";
import AddChatForm from "./AddChatForm";

export default function ChatList() {
  const [addFriend, setAddFriend] = useState(false);
  const [search, setSearch] = useState("");

  const { user, isLoading: userLoading } = useUserInfo();
  const { chats, isLoading } = useChats();

  const displayedChats = search
    ? chats.filter((chat) => {
        const friend =
          chat.user1.id === user?.user?.id ? chat.user2 : chat.user1;
        if (friend.userName.toLowerCase().includes(search.toLowerCase())) {
          return chat;
        }
      })
    : chats;

  return (
    <div className="grid grid-rows-[auto_1fr] gap-3  py-3">
      <div className="flex px-2 gap-2">
        <Search search={search} setSearch={setSearch} />

        <Button clickHandler={() => setAddFriend(true)}>
          <IoMdAdd />
        </Button>
      </div>

      <div className="flex flex-col overflow-auto py-3 max-h-[80dvh]">
        {(isLoading || userLoading) && <SmallLoader />}

        {!isLoading && chats?.length === 0 && (
          <p className="p-2 text-center">
            You don&apos;t have friends yet..! 🤷‍♂️
          </p>
        )}

        {!isLoading && chats?.length !== 0 && displayedChats?.length === 0 && (
          <p className="p-2 text-center">No Result Found ..! 🤷‍♂️</p>
        )}

        {!isLoading &&
          displayedChats?.map((chat) => {
            const friend =
              chat.user1.id === user?.user?.id ? chat.user2 : chat.user1;
            return (
              <NavLink key={friend.id} to={`/chat/${chat.id}`}>
                <Chat
                  userName={friend.userName}
                  avatar={friend.avatar}
                  lastUpdate={formatDate(chat.lastUpdate)}
                  lastMessage={chat.lastMessage}
                  unSeens={JSON.parse(chat.unSeens)}
                  key={chat.id}
                />
              </NavLink>
            );
          })}
      </div>

      {addFriend && <AddChatForm onCancel={() => setAddFriend(false)} />}
    </div>
  );
}
