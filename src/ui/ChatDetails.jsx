/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";

import useGetMessages from "../features/messages/useGetMessages";
import useReadMessages from "../features/messages/useReadMessages";
import useUnseenMessages from "../features/messages/useUnseenMessages";
import useUpdateChat from "../features/chats/useUpdateChat";

import { getLastUpdate } from "../utils/helper";

import Message from "../features/messages/Message";
import SmallLoader from "../ui/SmallLoader";
import DateBadge from "./DateBadge";

export default function ChatDetails({ chatId, userId }) {
  const { messages, isLoading } = useGetMessages(chatId);
  const { readMessages } = useReadMessages();
  const { unReadMessages, isLoading: unReadLoading } =
    useUnseenMessages(chatId);
  const { updateChat } = useUpdateChat();

  const [showScrollButton, setShowScrollButton] = useState(false);

  const spanRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (spanRef.current) {
      spanRef.current.scrollIntoView();
    }
  };

  const scrollUpHandler = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;

      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 200);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: true,
    });

    let chat;

    if (chatRef.current) {
      chat = chatRef.current;

      chat.addEventListener("scroll", scrollUpHandler);

      return () => {
        chat.removeEventListener("scroll", scrollUpHandler);
      };
    }
  }, []);

  useEffect(() => {
    readMessages({ chatId, userId });
    const fields = { unSeens: JSON.stringify(unReadMessages) };
    updateChat({ chatId, fields });
    scrollToBottom();
  }, [unReadMessages]);

  useEffect(() => {
    if (messages?.length) scrollToBottom();
  }, [messages]);

  if (isLoading) return <SmallLoader />;

  if (messages?.length === 0)
    return <p className="p-2 text-center">No messages yet..!</p>;

  return (
    <div className="flex flex-col gap-3 p-3 overflow-auto " ref={chatRef}>
      {messages?.map((message, index) => {
        const currentDate = new Date(message?.created_at).getDate();
        const prevDate =
          index > 0
            ? new Date(messages[index - 1]?.created_at.toString()).getDate()
            : null;

        const showDate = currentDate !== prevDate;

        return (
          <>
            {showDate && (
              <DateBadge key={Math.random()}>
                {new Date(message.created_at).getDate() === new Date().getDate()
                  ? "today"
                  : getLastUpdate(message.created_at)}
              </DateBadge>
            )}

            <Message
              key={message.id}
              text={message.content}
              img={message.image}
              isOwn={message.sender_id === userId}
              time={message.created_at}
            />
          </>
        );
      })}

      {showScrollButton && (
        <button
          className={
            "p-1 rounded-full bg-blue-100 fixed bottom-28 right-5  text-blue-700 flex justify-center items-center hover:scale-110 transition "
          }
          onClick={scrollToBottom}
        >
          <IoChevronDownOutline />
        </button>
      )}

      <span ref={spanRef}></span>
    </div>
  );
}
