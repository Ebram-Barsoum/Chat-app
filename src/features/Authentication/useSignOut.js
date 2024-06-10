/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signOut } from "../../services/apiAuth";

export default function useSignOut() {
    const navigate = useNavigate();
    //  const queryClient = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            //queryClient.removeQueries();
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { logOut: mutate, isLoading: status === 'pending' };
}