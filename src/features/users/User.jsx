/* eslint-disable react/prop-types */
export default function User({ img, name, bio }) {
  return (
    <div className="flex items-center justify-between px-3 ">
      <div className="flex items-center gap-2">
        <img
          src={img || "/default-user.jpg"}
          alt={`${name}'s image`}
          className=" h-[3rem] w-[3rem] rounded-full shadow-sm object-cover"
        />
        <div className="flex flex-col ">
          <h2 className=" font-bold sm:text-sm">{name}</h2>
          {bio && <p className="text-sm text-stone-300">{bio}</p>}
        </div>
      </div>
    </div>
  );
}
