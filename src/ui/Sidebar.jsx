import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

import useSignOut from "../features/Authentication/useSignOut";
import useUser from "../features/users/useUser";

import User from "../features/users/User";
import Row from "./Row";
import ButtonIcon from "./ButtonIcon";
import ChatList from "../features/chats/ChatList";
import UserSettingsForm from "../features/users/UserSettingsForm";

export default function Sidebar() {
  const [userSetting, setUserSetting] = useState(false);

  const { logOut, isLoading } = useSignOut();
  const { user } = useUser();

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] border-r-[.5px] border-stone-500 w-[100%] md:max-w-[26rem] grid grid-rows-[auto_auto_1fr] ">
      <Row style={"p-0 border-b-[.5px] border-b-gray-400"}>
        <User
          name={user?.user?.user_metadata?.name}
          img={user?.user?.user_metadata?.avatar}
        />
        <div className="flex items-center gap-2 px-2">
          <ButtonIcon clickHandler={() => setUserSetting(true)}>
            <FaRegEdit />
          </ButtonIcon>

          <ButtonIcon clickHandler={handleLogout} isDisabled={isLoading}>
            <LuLogOut />
          </ButtonIcon>
        </div>
      </Row>

      <ChatList />

      {userSetting && (
        <UserSettingsForm onCancel={() => setUserSetting(false)} />
      )}
    </div>
  );
}
