import { useQuery } from "@tanstack/react-query";
import { getUnseenMessages } from "../../services/apiMessages";
import toast from "react-hot-toast";

export default function useUnseenMessages(chatId) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['unseen-messages', chatId],
        queryFn: () => getUnseenMessages(chatId),
    });

    if (error) {
        toast.error(error.message);
    }

    return { unReadMessages: data, isLoading };
}