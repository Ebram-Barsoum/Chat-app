/* eslint-disable react/prop-types */
export default function User({ img, name, bio }) {
  return (
    <div className="flex items-center justify-between px-3 ">
      <div className="flex items-center gap-2">
        <img
          src={img || "/default-user.jpg"}
          alt={`${name}'s image`}
          className=" h-[3rem] w-[3rem] rounded-full shadow-sm object-cover"
          loading="lazy"
        />
        <div className="flex flex-col ">
          <h2 className=" font-bold sm:text-sm">{name}</h2>
          {bio && (
            <p className="text-[10px] text-stone-300 w-[100%] h-[1rem] overflow-hidden text-ellipsis sm:w-[100%] ">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
