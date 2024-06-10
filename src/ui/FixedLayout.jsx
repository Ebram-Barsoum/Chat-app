/* eslint-disable react/prop-types */
export default function FixedLayout({ children }) {
  return (
    <div className="h-[100dvh] w-[100dvw] fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm">
      {children}
    </div>
  );
}
