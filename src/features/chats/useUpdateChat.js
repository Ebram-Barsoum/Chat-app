import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateChat } from "../../services/apiChat";

export default function useUpdateChat() {
    const queryClient = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: ({ chatId, lastMessage }) => updateChat({ chatId, lastMessage }),
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            queryClient.invalidateQueries({
                active: true
            });
        }
    });

    return { updateChat: mutate, isLoading: status === 'pending' };
}