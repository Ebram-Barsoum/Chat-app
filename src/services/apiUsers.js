import toast from "react-hot-toast";
import supabase from "./supabase";

export async function getUserBy(filed, value) {
    const { data: user, error } = await supabase
        .from("clients")
        .select("*")
        .eq(filed, value)
        .single();

    if (error) {
        toast.error('This user is Not found');
    }

    return user;
}
