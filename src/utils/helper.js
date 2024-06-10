/* eslint-disable no-unused-vars */

const d = '2024-06-04 22:12:08.670029+00';

export function getLastUpdate(date) {
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




