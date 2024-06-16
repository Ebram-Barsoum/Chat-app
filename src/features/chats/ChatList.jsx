/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import { useUserInfo } from "../../contexts/userContext";
import { useChats } from "../../contexts/chatsContext";

import { getLastUpdate } from "../../utils/helper";

import Chat from "../../ui/Chat";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import AddChatForm from "./AddChatForm";

export default function ChatList() {
  const [addFriend, setAddFriend] = useState(false);
  const [search, setSearch] = useState("");

  const { user } = useUserInfo();
  const chats = useChats();

  const displayedChats = search
    ? chats.filter((chat) => {
        const friend = chat.user1.id === user.id ? chat.user2 : chat.user1;
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
        {chats?.length === 0 && (
          <p className="p-2 text-center">
            You don&apos;t have friend yet..! 🤷‍♂️
          </p>
        )}

        {chats?.length !== 0 && displayedChats?.length === 0 && (
          <p className="p-2 text-center">No Result Found ..! 🤷‍♂️</p>
        )}

        {displayedChats?.map((chat) => {
          const friend = chat.user1.id === user.id ? chat.user2 : chat.user1;
          return (
            <NavLink key={friend.id} to={`/chat/${chat.id}`}>
              <Chat
                userName={friend.userName}
                avatar={friend.avatar}
                lastUpdate={getLastUpdate(chat.lastUpdate)}
                lastMessage={chat.lastMessage}
                unSeens={JSON.parse(chat.unSeens)}
              />
            </NavLink>
          );
        })}
      </div>

      {addFriend && <AddChatForm onCancel={() => setAddFriend(false)} />}
    </div>
  );
}
