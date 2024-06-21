/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo, useState } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";

import FixedLayout from "../../ui/FixedLayout";
import DownloadButton from "../../ui/DownloadButton";

const Message = memo(function Message({ img, text, isOwn, time }) {
  const [zoomedImage, setZoomedimage] = useState("");
  const ref = useOutsideClick(close);

  function close() {
    setZoomedimage("");
  }

  return (
    <>
      {img && (
        <div
          className={`p-1 w-[70%] rounded-md flex flex-col ${
            isOwn ? "ms-auto" : "me-auto "
          }`}
        >
          <div className={`flex gap-1 w-[100%] ${isOwn && "justify-end"}`}>
            {isOwn && <DownloadButton path={img} />}
            <img
              src={img}
              alt="chat image"
              className={`cursor-pointer object-cover rounded-md max-w-[80%] sm:max-w-[50%]`}
              loading="lazy"
              onClick={() => setZoomedimage(img)}
            />
            {!isOwn && <DownloadButton path={img} />}
          </div>

          <span className={`text-[11px] ${isOwn ? " ms-auto" : "me-auto "}`}>
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      )}

      {text && (
        <p
          className={`max-w-[90%] flex gap-2 rounded-md py-1 px-2  ${
            isOwn ? "bg-blue-950 ms-auto" : "bg-[#fff] me-auto text-black"
          } `}
        >
          <span>{text}</span>
          <span className="text-[11px] self-end mt-2">
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      )}

      {zoomedImage !== "" && (
        <FixedLayout>
          <img
            src={zoomedImage}
            data-aos="zoom-in-down"
            ref={ref}
            className="max-w-[90%] sm:max-w-[40%]"
          />
        </FixedLayout>
      )}
    </>
  );
});

export default Message;
