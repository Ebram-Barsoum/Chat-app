/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChats } from "../../services/apiChat";
import { useEffect } from "react";
import supabase from "../../services/supabase";

export default function useGetChats(userId) {
    const queryClient = useQueryClient();

    const { data: chats, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: () => getChats(userId),

    });

    // useEffect(() => {
    //     const subscription = supabase
    //         .channel("public:chats")
    //         .on(
    //             "postgres_changes",
    //             {
    //                 event: "*",
    //                 schema: "public",
    //                 table: "chats",
    //             },
    //             (payload) => {
    //                 queryClient.setQueriesData(["chats"], (oldChats) => [
    //                     ...(oldChats || []),
    //                     payload.new,
    //                 ]);
    //             }
    //         )
    //         .subscribe();

    //     return () => {
    //         supabase.removeChannel(subscription);
    //     };
    // }, [queryClient]);

    return { chats, isLoading };
}
