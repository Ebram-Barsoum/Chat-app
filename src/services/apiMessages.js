/* eslint-disable no-unused-vars */
import { updateChat } from "./apiChat";
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
