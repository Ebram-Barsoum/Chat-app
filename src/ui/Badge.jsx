/* eslint-disable react/prop-types */
export default function Badge({ children }) {
  return (
    <span className="flex justify-center items-center w-[20px] h-[20px] bg-blue-100 text-blue-700 rounded-full ms-auto">
      {children}
    </span>
  );
}
