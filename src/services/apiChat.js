/* eslint-disable no-unused-vars */
import supabase from "./supabase";

export async function addChat({ user1_id, user2_id }) {
    const newChat = {
        lastUpdate: new Date(),
        isBlocked: false,
        isSeen: false,
        user1_id,
        user2_id,
    };

    const { data, error } = await supabase
        .from("chats")
        .insert([newChat])
        .select()
        .single();

    if (error) {
        console.log(error);
        throw Error(error);
    }

    return data;
}

export async function getChats(userId) {
    const { data: chats, error } = await supabase
        .from("chats")
        .select(
            "*, user1:clients!user1_id (id, email, userName, bio, avatar), user2:clients!user2_id (id, email, userName, bio, avatar)"
        )
        .or(`user1_id.eq.${userId}, user2_id.eq.${userId}`)
        .order("lastUpdate", { ascending: true });

    if (error) {
        console.log(error);
        throw Error(error);
    }

    return chats;
}

export async function updateChat({ chatId, lastMessage }) {
    const { data, error } = await supabase
        .from("chats")
        .update({ 'lastMessage': lastMessage.content, 'lastUpdate': lastMessage.date }).eq('id', chatId);

    if (error) {
        throw new Error(error);
    }

    return data;
}
