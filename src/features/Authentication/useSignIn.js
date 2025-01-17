import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useSignIn() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: (data) => signIn(data),
        onSuccess: ({ user }) => {
            navigate('/');
            toast.success('Logged in successfully ..!')
            queryClient.setQueryData(['user'], user);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { signIn: mutate, isLoading: status === 'pending' };
}