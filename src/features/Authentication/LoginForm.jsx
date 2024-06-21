/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import useSignIn from "./useSignIn";

import Error from "../../ui/Error";
import Button from "../../ui/Button";
import FormHeader from "../../ui/FormHeader";
import { useUserInfo } from "../../contexts/userContext";
import { useEffect } from "react";
import FullSpinner from "../../ui/FullSpinner";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { signIn, isLoading } = useSignIn();
  const { user, isLoading: userLoading } = useUserInfo();
  const navigate = useNavigate();
  const handleSubmitForm = (data) => {
    signIn(data);
    reset();
  };

  useEffect(() => {
    if (user?.user?.role === "authenticated") {
      navigate("/");
    }
  }, [user, navigate]);

  if (userLoading) return <FullSpinner />;

  return (
    <div className="p-4 bg-white text-gray-900 w-[90%] sm:w-[28rem] rounded-md shadow-sm">
      <FormHeader>Login to your account</FormHeader>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-2 text-md md:text-lg"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="px-2 py-1 rounded-md border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700
            transition "
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

        <p className="text-[12px] sm:text-[14px]">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="text-blue-900">
            Register now
          </Link>
        </p>

        <Button
          className="text-white mt-2 bg-blue-800 hover:bg-blue-900 "
          isDisabled={isLoading}
          type={"submit"}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
