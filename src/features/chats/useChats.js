import { useQuery } from "@tanstack/react-query";
import { getChats } from "../../services/apiChat";


export default function useChats(userId) {
    const { data: chats, isLoading } = useQuery({
        queryKey: ['chats'],
        queryFn: () => getChats(userId)
    });

    return { chats, isLoading };
}