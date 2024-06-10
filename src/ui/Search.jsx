/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";

export default function Search({ search, setSearch }) {
  return (
    <div className="self-start flex-grow-1 w-[100%]">
      <div className="relative w-[100%] md:w-[22rem]">
        <span className=" absolute top-2 left-2 z-10 text-gray-100">
          <CiSearch />
        </span>

        <input
          type="text"
          placeholder="search for a friend ...!"
          className="p-1 ps-7 rounded-md absolute bg-[#001d3de7] w-[100%] 
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
           transition"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
