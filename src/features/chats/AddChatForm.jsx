/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

import { getUserBy } from "../../services/apiUsers";
import useAddChat from "../chats/useAddChat";
import useUser from "../users/useUser";

import FixedLayout from "../../ui/FixedLayout";
import Button from "../../ui/Button";

export default function AddChatForm({ onCancel }) {
  const [friendEmail, setFriendEmail] = useState("");
  const { createChat, isLoading } = useAddChat();
  const { user } = useUser();

  const handleFriendSearch = async (e) => {
    e.preventDefault();
    if (!friendEmail) return;

    const friend = await getUserBy("email", friendEmail);

    createChat(
      { user1_id: user?.user?.id, user2_id: friend.id },
      { onSuccess: onCancel }
    );
  };

  return (
    <FixedLayout>
      <form
        onSubmit={handleFriendSearch}
        className="bg-gray-50 w-[90%] sm:w-[22rem] py-3 px-4 pt-5 rounded-md flex flex-col gap-3"
      >
        <input
          type="email"
          placeholder="Enter a Firend Email"
          className="p-2 text-black border-2 border-gray-200 rounded-lg w-[100%] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
          transition"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex justify-end items-center gap-3">
          <Button
            className="bg-white text-gray-500 border-2 border-gray-200 hover:bg-gray-100 "
            clickHandler={onCancel}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-800 p-2  hover:bg-blue-900"
            isDisabled={isLoading}
            type={"submit"}
          >
            Add Friend
          </Button>
        </div>
      </form>
    </FixedLayout>
  );
}
