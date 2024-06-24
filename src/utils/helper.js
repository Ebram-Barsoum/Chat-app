/* eslint-disable no-unused-vars */
import { supabaseUrl } from "../services/supabase";

export function formatDate(date) {
    const inputDate = new Date(date), now = new Date();
    const monthsDiff = now.getMonth() - inputDate.getMonth();
    const yearsDiff = now.getFullYear() - inputDate.getFullYear();

    const displayFullDate = monthsDiff || yearsDiff;

    if (displayFullDate) return inputDate.toLocaleDateString();

    const days = now.getDate() - inputDate.getDate();

    if (days === 0) {
        return inputDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    else if (days === 1) {
        return 'Yesterday'
    }

    return inputDate.toLocaleDateString();
}

export function createImageUrl(bucket, image) {
    if (!bucket || !image) return null;

    const imageName = `${Math.random()}-${image?.name?.replaceAll('/', '-')}`;
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${imageName}`;

    return { imageName, imageUrl };
}




