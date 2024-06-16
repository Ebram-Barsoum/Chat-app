/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateChat } from "../../services/apiChat";
import { useEffect } from "react";
import supabase from "../../services/supabase";


export default function useUpdateChat() {
    const queryClient = useQueryClient();


    const { mutate, status } = useMutation({
        mutationFn: ({ chatId, fields }) => updateChat({ chatId, fields }),
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        }
    });

    return { updateChat: mutate, isLoading: status === 'pending' };
}