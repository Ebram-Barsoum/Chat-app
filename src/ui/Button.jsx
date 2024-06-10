/* eslint-disable react/prop-types */
export default function Button({
  children,
  clickHandler,
  isDisabled,
  className,
  type
}) {
  return (
    <button
      className={`flex justify-center items-center p-2 rounded-md
     bg-[#001d3de7] ring-offset-2 ring-blue-500 focus:ring-2
     focus:ring-offset-1 focus:ring-blue-700 transition ${className}`}
      onClick={clickHandler}
      disabled={isDisabled}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
