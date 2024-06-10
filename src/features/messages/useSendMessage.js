import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../services/apiMessages";
import toast from "react-hot-toast";

export default function useSendMessage() {
    const { mutate, status } = useMutation({
        mutationFn: (message) => sendMessage(message),
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { sendMessage: mutate, isLoading: status === 'pending' };
}