/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLargeLine } from "react-icons/ri";
import { CgCalendarDates } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useUserInfo } from "../../contexts/userContext";
import useUpdateUser from "../users/useUpdateUser";

import Button from "../../ui/Button";
import FixedLayout from "../../ui/FixedLayout";

export default function UserInfoForm({ onCancel }) {
  const { handleSubmit, register } = useForm();
  const { user } = useUserInfo();
  const { avatar, email, name, bio } = user.user_metadata;
  const [newAvatar, setNewAvatar] = useState(null);

  const { updateUser, isLoading } = useUpdateUser();

  const handleSubmitForm = (data) => {
    if (name === data.name && bio === data.bio && !newAvatar) return;

    const newData = {
      userName: data.name,
      bio: data.bio,
      avatar: newAvatar || avatar,
    };
    console.log(newData);

    updateUser({ id: user.id, newData });
  };

  return (
    <FixedLayout>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-[90%] md:w-[48rem] bg-blue-50 p-3 rounded-md text-gray-600 flex flex-col gap-3 overflow-auto max-h-[80dvh]"
      >
        <header className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg text-blue-700 font-bold">Your Profile</h1>
            <button
              className="text-gray-500 hover:text-black transition"
              onClick={onCancel}
              disabled={isLoading}
            >
              <RiCloseLargeLine />
            </button>
          </div>

          <p className="p-1 text-[14px] rounded-md bg-blue-100 me-auto text-blue-700 flex items-center gap-2">
            <CgCalendarDates />
            Joined at {new Date(user.created_at).toLocaleDateString()} 😍
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:self-end gap-5 w-[100%]">
          <div className="w-[50%] sm:w-[30%] m-auto">
            <input
              type="file"
              accept="image/*"
              hidden
              id="image"
              onChange={(e) => setNewAvatar(e.target.files[0])}
              disabled={isLoading}
            />
            <label htmlFor="image" className="flex flex-col items-center gap-2">
              <img
                src={avatar || "/public/default-user.jpg"}
                alt={`${name}'s profile picture`}
                className="  m-auto  rounded-full hover:opacity-85 transition cursor-pointer"
              />
              {newAvatar && (
                <span className="flex items-center gap-1 text-[13px] border-[1px] border-blue-300 p-1 rounded-md bg-blue-100 text-blue-700">
                  Selected <IoMdCheckmarkCircleOutline />
                </span>
              )}
            </label>
          </div>

          <div className="flex flex-col gap-3 w-[100%] sm:w-[65%] justify-center">
            <input
              type="email"
              value={email}
              disabled
              className="px-2 py-1 rounded-md bg-white border-[2px] "
            />
            <input
              type="text"
              placeholder="Your Name"
              defaultValue={name}
              className="px-2 py-1 focus:outline-none rounded-md border-[2px]  bg-white ring-blue-600 focus:ring-2 ring-offset-2 transition"
              {...register("name")}
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Your Bio"
              defaultValue={bio || ""}
              className="px-2 py-1 focus:outline-none rounded-md border-[2px] bg-white ring-blue-600 focus:ring-2 ring-offset-2  transition"
              {...register("bio")}
              disabled={isLoading}
            />

            <div className="flex justify-end items-center gap-2">
              <Button
                clickHandler={onCancel}
                className={
                  "bg-white border-2 border-gray-300 transition hover:bg-gray-50 "
                }
                isDisabled={isLoading}
              >
                cancel
              </Button>

              <Button
                className={
                  "bg-blue-800 text-white hover:bg-blue-900 transition "
                }
                type={"submit"}
                isDisabled={isLoading}
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
