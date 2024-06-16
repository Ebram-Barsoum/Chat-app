import { useMutation, } from "@tanstack/react-query";
import { readMessages } from "../../services/apiMessages";


export default function useReadMessages() {
    const { mutate, status } = useMutation({
        mutationFn: ({ chatId, userId }) => readMessages({ chatId, userId }),

    });

    return { readMessages: mutate, isLoading: status === 'pending' };
}