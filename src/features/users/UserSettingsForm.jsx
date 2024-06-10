/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useUserInfo } from "../../contexts/userContext";
import Button from "../../ui/Button";
import FixedLayout from "../../ui/FixedLayout";

export default function UserInfoForm({ onCancel }) {
  const { user } = useUserInfo();

  const { email, name, avatar, bio } = user.user_metadata;
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FixedLayout>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[48rem] bg-gray-100 p-3 rounded-md text-gray-600 flex flex-col gap-3 overflow-auto max-h-[80dvh]"
      >
        <header className="flex justify-between items-center">
          <h1 className="text-lg">User Info</h1>
          <button>X</button>
        </header>

        <div className="flex flex-col sm:flex-row  gap-5 w-[100%]">
          <img
            src={avatar}
            alt={`${name}'s profile picture`}
            className=" w-[50%] m-auto sm:w-[30%] rounded-full hover:opacity-85 transition"
          />

          <div className="flex flex-col gap-3 w-[100%] sm:w-[65%] justify-center">
            <input
              type="email"
              value={email}
              disabled
              className="px-2 py-1 rounded-md bg-white ring-gray-200 ring-2 ring-offset-1 text-gray-500"
            />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              className="px-2 py-1 focus:outline-0 rounded-md bg-white ring-gray-200 ring-2 ring-offset-1 text-gray-500"
            />

            <input
              type="text"
              placeholder="Your Bio"
              value={bio || ""}
              className="px-2 py-1 focus:outline-0 rounded-md bg-white ring-gray-200 ring-2 ring-offset-1 text-gray-500"
            />

            <div className="flex justify-end items-center gap-2">
              <Button
                clickHandler={onCancel}
                className={
                  "bg-white border-2 border-gray-300 transition hover:bg-gray-50 "
                }
              >
                cancel
              </Button>

              <Button
                clickHandler={onCancel}
                className={
                  "bg-blue-800 text-white hover:bg-blue-900 transition "
                }
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FixedLayout>
  );
}
