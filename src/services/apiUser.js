/* eslint-disable no-unused-vars */
import { createImageUrl } from "../utils/helper";
import supabase from "./supabase";

export async function updateUserInfo({ id, newData }) {
    // 1- upload new profile picture in case it updated
    if (typeof newData.avatar !== "string") {
        const { imageName, imageUrl } = createImageUrl("avatar", newData.avatar);

        const { data, error: storageError } = await supabase.storage
            .from("avatar")
            .upload(imageName, newData.avatar);

        if (storageError) {
            throw Error(storageError);
        }

        newData.avatar = imageUrl;
    }

    // 2- update authentication data
    const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: { name: newData.userName, bio: newData.bio, avatar: newData.avatar }
    });

    if (authError) {
        throw Error(authError);
    }

    // 3- add new user info to database
    const { data, error } = await supabase
        .from("clients")
        .update([{ ...newData }])
        .eq("id", id)
        .select();

    if (error) {
        console.log(error);
        throw Error(error);
    }

    return data;
}
