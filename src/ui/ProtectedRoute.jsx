/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useUser from "../features/users/useUser";
import FullSpinner from "./FullSpinner";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <FullSpinner />;

  if (user?.user?.role !== "authenticated") navigate("/login");

  if (user?.user?.role === "authenticated") return children;
}
