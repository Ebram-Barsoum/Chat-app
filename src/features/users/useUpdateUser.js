import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "../../services/apiUser";
import toast from "react-hot-toast";

export default function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: ({ id, newData }) => updateUserInfo({ id, newData }),
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Profile updated successfully..!');
            queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    return { updateUser: mutate, isLoading: status === 'pending' };
}