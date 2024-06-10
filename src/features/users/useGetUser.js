import { useQuery } from "@tanstack/react-query";
import { getUserBy } from "../../services/apiUsers";

export default function useGetUser(email) {
    const { data: friend, isLoading } = useQuery({
        queryKey: ['friend', email],
        queryFn: getUserBy('email', email),
    });

    return { friend, isLoading };
}