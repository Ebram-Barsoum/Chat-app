/* eslint-disable react/prop-types */
export default function ButtonIcon({
  children,
  clickHandler,
  isDisabled,
  type,
}) {
  return (
    <button
      className="flex justify-center items-center p-2
       hover:bg-[#001d3de7] rounded-md focus:bg-[#001d3de7] 
       ring-offset-2  focus:ring-2 focus:ring-offset-1
        focus:ring-blue-700 transition"
      onClick={clickHandler}
      disabled={isDisabled}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
