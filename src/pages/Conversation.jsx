/* eslint-disable no-unused-vars */
import ActiveChat from "../ui/ActiveChat";
import Sidebar from "../ui/Sidebar";

export default function Conversation() {
  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="w-[100%]">
        <ActiveChat />
      </div>
    </div>
  );
}
