import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[100%] hidden md:flex justify-center items-center">
        <p className="text-lg flex px-3 text-center">
          Select Chat and start a conversation right now ..! 👋
        </p>
      </div>
    </div>
  );
}
