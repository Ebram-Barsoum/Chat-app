/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signUp } from "../../services/apiAuth";

export default function useSignup() {
    const navigate = useNavigate();

    const { mutate, status } = useMutation({
        mutationFn: (data) => signUp(data),
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { signUp: mutate, isLoading: status === 'pending' }
}