/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../contexts/userContext";

import FullSpinner from "./FullSpinner";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user?.role !== "authenticated") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) return <FullSpinner />;

  return children;
}
