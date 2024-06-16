/* eslint-disable react/prop-types */
import MessageForm from "../features/messages/MessageForm";

export default function ChatFooter({ chatId }) {
  return (
    <div className="flex gap-2 items-center border-t-[.5px] border-stone-500 p-2">
      <MessageForm chatId={chatId} />
    </div>
  );
}
