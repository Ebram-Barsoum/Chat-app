/* eslint-disable react/prop-types */
export default function Row({ children, style }) {
  return (
    <div className={`flex justify-between items-center p-3 ${style}`}>
      {children}
    </div>
  );
}
