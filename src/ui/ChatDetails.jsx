/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

import useGetMessages from "../features/messages/useGetMessages";

import Message from "../features/messages/Message";
import SmallLoader from "../ui/SmallLoader";

export default function ChatDetails({ chatId, userId }) {
  const { messages, isLoading } = useGetMessages(chatId);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const ref = useRef(null);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
      });
    }
  };

  const scrollUpHandler = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 200);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [ref]);

  useEffect(() => {
    let chat;

    if (ref.current) {
      chat = ref.current;

      chat.addEventListener("scroll", scrollUpHandler);

      return () => {
        chat.removeEventListener("scroll", scrollUpHandler);
      };
    }
  }, [ref]);

  if (isLoading) return <SmallLoader />;

  if (messages.length === 0)
    return <p className="p-2 text-center">No messages yet..!</p>;

  return (
    <div className="flex flex-col gap-3 p-3 overflow-auto " ref={ref}>
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.content}
          img={message.image}
          isOwn={message.sender_id === userId}
          time={message.created_at}
        />
      ))}

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
    </div>
  );
}
