/* eslint-disable no-unused-vars */
import { supabaseUrl } from "../services/supabase";

export function formatDate(date) {
    const months = new Date().getMonth() - new Date(date).getMonth();

    if (months) return new Date(date).toLocaleDateString();

    const days = new Date().getDate() - new Date(date).getDate();

    if (days === 0) {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    else if (days === 1) {
        return 'Yesterday'
    }

    return new Date(date).toLocaleDateString();
}

export function createImageUrl(bucket, image) {
    const imageName = `${Math.random()}-${image?.name}`;
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${imageName}`;

    return { imageName, imageUrl };
}




