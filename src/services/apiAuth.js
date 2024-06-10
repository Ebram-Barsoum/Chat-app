/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ userName, email, password, avatar }) {
    // 1- signup user
    const avatarName = avatar[0]
        ? `${Math.random()}-${avatar[0].name.replaceAll("/", "")}`
        : null;

    const avatarURL = `${supabaseUrl}/storage/v1/object/public/avatar/${avatarName}`;

    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: userName,
                avatar: avatar[0] ? avatarURL : "",
                bio: ''
            },
        },
    });

    if (error) {
        throw new Error(error);
    }

    console.log(data?.user?.id);

    // 2- add user to database
    const userId = data?.user?.id;
    const newUser = { id: userId, userName, email, avatar: avatar[0] ? avatarURL : "" };

    const { data: user, error: dbError } = await supabase
        .from('clients')
        .insert(
            [newUser],
        )
        .select();

    if (dbError) {
        throw Error(dbError);
    }

    // 3- upload avatar if exists
    if (!avatar[0]) return;

    const { data: storageData, error: storageError } = await supabase.storage
        .from("avatar")
        .upload(avatarName, avatar[0]);

    if (storageError) {
        throw Error(storageError);
    }

    return user;
}

export async function signIn({ email, password }) {

    let { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw Error(error);
    }

    return user;
}

export async function signOut() {
    let { error } = await supabase.auth.signOut()

    if (error) {
        throw Error(error);
    }
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    console.log(data);
    if (error) {
        console.log(error.message);
        throw Error(error);
    }

    return data || null;
}

/*
user1: abram@gmail.com
pwd: 101010

user2: kena@gmail.com
pwd: 123456
*/