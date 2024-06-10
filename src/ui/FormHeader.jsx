/* eslint-disable react/prop-types */
export default function FormHeader({ children }) {
  return (
    <h1 className="text-center text-lg sm:text-xl md:text-2xl font-semibold mb-2">
      {children}
    </h1>
  );
}
