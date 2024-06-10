/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";

import useSignup from "./useSignup";

import Error from "../../ui/Error";
import Button from "../../ui/Button";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { signUp, isLoading } = useSignup();

  const handleSubmitForm = (data) => {
    signUp(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="p-4 bg-white shadow-sm text-gray-900 w-[90%] sm:w-[28rem] rounded-md">
      <h1 className="text-center text-2xl font-semibold">Create Account</h1>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-2 text-lg"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="userName">User name</label>
          <input
            type="text"
            id="userName"
            autoComplete="email"
            className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
            transition border-2 border-gray-100"
            {...register("userName", {
              required: "name is required",
            })}
            disabled={isLoading}
          />

          {errors.userName && <Error>{errors.userName.message}</Error>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
            transition border-2 border-gray-100"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email",
              },
            })}
            disabled={isLoading}
          />

          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
            transition border-2 border-gray-100"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 chars",
              },
            })}
            disabled={isLoading}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="image"
            className="bg-gray-100 me-auto p-2 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <CiImageOn />
            Upload image
          </label>
          <input
            type="file"
            id="image"
            className="px-2 py-1 rounded-md hidden "
            accept="image/*"
            {...register("avatar")}
            disabled={isLoading}
          />
        </div>

        <p className="text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-900">
            Login
          </Link>
        </p>

        <Button
          className="text-white mt-2 bg-blue-800 hover:bg-blue-900 "
          isDisabled={isLoading}
          type={"submit"}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
