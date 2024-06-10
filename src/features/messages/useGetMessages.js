import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../../services/apiMessages";
import supabase from "../../services/supabase";
import { useEffect } from "react";

export default function useGetMessages(chatId) {
    const queryClient = useQueryClient();

    const { data: messages, isLoading } = useQuery({
        queryKey: ['messages', chatId],
        queryFn: () => getMessages(chatId)
    });

    useEffect(() => {
        const channel = supabase.channel('public:messages').on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `chat_id=eq.${chatId}`
        }, (payload) => {
            //console.log(payload);
            queryClient.setQueryData(['messages', chatId], (oldMessages) => [...(oldMessages || []), payload.new]);
        }).subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    }, [chatId, queryClient]);

    return { messages, isLoading };
}