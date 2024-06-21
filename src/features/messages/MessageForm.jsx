/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { FaImage } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import useOutsideClick from "../../hooks/useOutsideClick";
import useSendMessage from "./useSendMessage";
import useUpdateChat from "../chats/useUpdateChat.js";
import { useUserInfo } from "../../contexts/userContext";

import ButtonIcon from "../../ui/ButtonIcon";
import Button from "../../ui/Button";

export default function MessageForm() {
  const [openEmojis, setOpenEmojis] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const ref = useOutsideClick(() => setOpenEmojis(false));
  const { id } = useParams();
  const { user } = useUserInfo();

  const { sendMessage, isLoading } = useSendMessage();
  const { updateChat } = useUpdateChat();

  const handleOpenEmojis = (e) => {
    e.preventDefault();
    setOpenEmojis(true);
  };

  const handleEmojiClick = (e) => {
    setText((text) => text + e.emoji);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!text.trim() && !image) return;

    const message = {
      image,
      content: text,
      chat_id: id,
      sender_id: user?.user?.id,
    };

    sendMessage(message, {
      onSuccess: (data) => {
        let fields = {
          lastMessage: data.content || data.image,
          lastUpdate: data.created_at,
        };

        updateChat({
          chatId: data.chat_id,
          fields,
        });
      },
    });

    setText("");
    setImage(null);
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex w-[100%] pt-1 px-3 gap-3 items-center"
    >
      <input
        type="file"
        id="image"
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <label htmlFor="image" className="cursor-pointer">
        <FaImage />
      </label>

      <input
        type="text"
        placeholder=" write a message"
        className="px-3 py-2 rounded-full bg-[#001d3de7] w-[100%]  focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
        transition"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />

      <ButtonIcon clickHandler={handleOpenEmojis}>
        <MdOutlineEmojiEmotions />
      </ButtonIcon>

      <div className=" fixed top-32 right-5 w-[80%] sm:w-[18rem]" ref={ref}>
        <EmojiPicker
          open={openEmojis}
          onEmojiClick={handleEmojiClick}
          theme="dark"
          width={"100%"}
        />
      </div>

      <Button
        isDisabled={!(text || image?.name)}
        type={"submit"}
        name="sending message button"
      >
        <VscSend />
      </Button>
    </form>
  );
}
