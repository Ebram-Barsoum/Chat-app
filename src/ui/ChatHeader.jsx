/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaInfoCircle, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

import User from "../features/users/User";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";

export default function ChatHeader({ friend }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-blue-950 px-3 border-t-[.5px] border-stone-500 p-2">
      <div className={" flex items-center"}>
        <button
          onClick={goBack}
          className="text-gray-500 hover:text-white transition"
        >
          <MdArrowBackIos />
        </button>
        <User
          name={friend?.userName}
          img={friend?.avatar || "/default-user.jpg"}
          bio={friend?.bio}
        />
      </div>

      <div className="flex items-center gap-2">
        <ButtonIcon>
          <FaPhoneAlt />
        </ButtonIcon>
        <ButtonIcon>
          <FaVideo />
        </ButtonIcon>
        <ButtonIcon>
          <FaInfoCircle />
        </ButtonIcon>
      </div>
    </div>
  );
}
