/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, useNavigate } from "react-router-dom";
import FullSpinner from "./FullSpinner";
import useUser from "../features/users/useUser";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <FullSpinner />;
  if (user?.user?.role !== "authenticated") {
    navigate("/login");
    return;
  }

  if (user?.user?.role === "authenticated") return children;
}
