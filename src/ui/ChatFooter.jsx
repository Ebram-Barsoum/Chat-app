import MessageForm from "../features/messages/MessageForm";

export default function ChatFooter() {
  return (
    <div className="flex gap-2 items-center border-t-[.5px] border-stone-500 p-2">
      <MessageForm />
    </div>
  );
}
