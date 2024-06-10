/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import useGetMessages from "../features/messages/useGetMessages";

import Message from "../features/messages/Message";
import SmallLoader from "../ui/SmallLoader";

export default function ChatDetails({ chatId, userId }) {
  const { messages, isLoading } = useGetMessages(chatId);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [messages]);

  if (isLoading) return <SmallLoader />;

  if (messages.length === 0)
    return <p className="p-2 text-center">No messages yet..!</p>;

  return (
    <div className="flex flex-col gap-3 p-3 overflow-auto">
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.content}
          img={message.image}
          isOwn={message.sender_id === userId}
          time={message.created_at}
        />
      ))}
      <span ref={ref}></span>
    </div>
  );
}
