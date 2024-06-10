/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import useChats from "./useChats";
import { useUserInfo } from "../../contexts/userContext";
import { getLastUpdate } from "../../utils/helper";

import Chat from "../../ui/Chat";
import SmallLoader from "../../ui/SmallLoader";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import AddChatForm from "./AddChatForm";

export default function ChatList() {
  const [addFriend, setAddFriend] = useState(false);
  const [search, setSearch] = useState("");

  const { user } = useUserInfo();
  const { chats, isLoading } = useChats(user.id);

  const displayedChats = search
    ? chats.filter((chat) => {
        const friend = chat.user1.id === user.id ? chat.user2 : chat.user1;
        if (friend.userName.toLowerCase().includes(search.toLowerCase())) {
          return chat;
        }
      })
    : chats;

  return (
    <div className="grid grid-rows-[auto_1fr]  py-3">
      <div className="flex px-2 gap-2">
        <Search search={search} setSearch={setSearch} />

        <Button clickHandler={() => setAddFriend(true)}>
          <IoMdAdd />
        </Button>
      </div>

      <div className="flex flex-col overflow-y-auto py-3">
        {isLoading && <SmallLoader />}

        {chats.length === 0 && (
          <p className="p-2 text-center">
            You don&apos;t have friend yet..! 🤷‍♂️
          </p>
        )}

        {displayedChats?.length === 0 && (
          <p className="p-2 text-center">No Result Found ..! 🤷‍♂️</p>
        )}

        {displayedChats.map((chat) => {
          const friend = chat.user1.id === user.id ? chat.user2 : chat.user1;
          return (
            <NavLink key={friend.id} to={`/chat/${chat.id}`}>
              <Chat
                userName={friend.userName}
                avatar={friend.avatar}
                lastUpdate={getLastUpdate(chat.lastUpdate)}
                lastMessage={chat.lastMessage}
              />
            </NavLink>
          );
        })}
      </div>

      {addFriend && <AddChatForm onCancel={() => setAddFriend(false)} />}
    </div>
  );
}
