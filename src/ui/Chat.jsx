/* eslint-disable react/prop-types */

import { IoImageOutline } from "react-icons/io5";

/* eslint-disable no-unused-vars */
export default function Chat({ avatar, userName, lastMessage, lastUpdate }) {
  //console.log(lastMessage);
  return (
    <div
      className=" flex justify-between 
    items-center w-[100%] md:max-w-[26rem] p-3 border-b-[.5px]
     border-b-stone-500 cursor-pointer
     hover:bg-[#001d3d3d] transition"
    >
      <div className=" flex justify-between items-center gap-3">
        <img
          src={avatar || "/public/default-user.jpg"}
          alt={`${userName}'image`}
          className="object-cover w-[3rem] h-[3rem] rounded-full shadow-md"
          loading="lazy"
        />

        <div className="flex flex-col">
          <div className=" font-bold ">{userName}</div>
          <p className="flex gap-1 items-center opacity-70 text-[12px] max-w-[10rem] sm:max-w-[14rem] max-h-[1rem] overflow-hidden text-ellipsis">
            {lastMessage?.startsWith(
              "https://gtzrnmylohektnyaejlm.supabase.co"
            ) ? (
              <>
                <IoImageOutline /> <span>image</span>
              </>
            ) : (
              lastMessage
            )}
          </p>
        </div>
      </div>

      <p className="text-stone-300 text-sm">{lastUpdate}</p>
    </div>
  );
}
