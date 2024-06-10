import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className=" min-h-[100dvh] bg-slate-100 flex flex-col justify-center items-center gap-4">
      <p className="p-4 bg-white text-black text-center w-[90%] sm:w-[28rem] rounded-md shadow-sm border-2 border-gray-100">
        This Page Is Not Found. 🧐
      </p>
      <Button clickHandler={() => navigate("/")}>Go back to App</Button>
    </div>
  );
}
