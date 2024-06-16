/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function sendMessage(message) {
    // 1- Upload the image [if exist] to supabase storage
    if (message.image) {
        const imageName = `${Math.random()}-${message.image.name.replaceAll(
            "/",
            ""
        )}`;
        const imageURL = `${supabaseUrl}/storage/v1/object/public/chatImages/${imageName}`;

        const { data, error: storageError } = await supabase.storage
            .from("chatImages")
            .upload(imageName, message.image);

        if (storageError) {
            throw new Error(storageError);
        }

        message = { ...message, image: imageURL };
    }

    // 2- Add message to supabase database
    const { data, error } = await supabase
        .from("messages")
        .insert([message])
        .select()
        .single();

    if (error) {
        throw new Error(error);
    }

    return data;
}

export async function getMessages(chatId) {
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error(error);
    }

    return data;
}

export async function getUnseenMessages(chatId) {
    const { data, error } = await supabase
        .from("messages")
        .select('*')
        .eq("chat_id", chatId)
        .eq("isRead", false);

    if (error) {
        console.log(error);
        throw Error(error);
    }

    return data;
}

export async function readMessages({ chatId, userId }) {
    const { data, error } = await supabase
        .from("messages")
        .update({ "isRead": true })
        .eq("isRead", false)
        .eq("chat_id", chatId).neq('sender_id', userId);

    if (error) {
        throw Error(error);
    }

    return data;
}
