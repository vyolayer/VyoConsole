import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api";

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
    });
}
