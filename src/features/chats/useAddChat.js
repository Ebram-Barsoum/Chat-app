import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addChat } from "../../services/apiChat";

export default function useAddChat() {
    const { mutate: createChat, status } = useMutation({
        mutationFn: ({ user1_id, user2_id }) => addChat({ user1_id, user2_id }),
        onError: (error) => toast.error(error.message)
    });

    return { createChat, isLoading: status === 'pending' };
}