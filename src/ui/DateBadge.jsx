/* eslint-disable react/prop-types */
import { memo } from "react";

const Date = memo(function Date({ children }) {
  return (
    <div className="py-1 px-2 rounded-md  border-[1px] border-blue-400 text-blue-200 m-auto text-[12px] mb-3">
      {children}
    </div>
  );
});

export default Date;
