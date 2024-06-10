/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function Message({ img, text, isOwn, time }) {
  return (
    <>
      {img && (
        <div
          className={`p-1 max-w-[70%] rounded-md flex flex-col ${
            isOwn ? " ms-auto" : "me-auto "
          }`}
        >
          <img
            src={img}
            alt="chat image"
            className={`w-[auto] sm:w-[50%] object-cover rounded-md ${
              isOwn && " ms-auto"
            }`}
            loading="lazy"
          />
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
    </>
  );
}
