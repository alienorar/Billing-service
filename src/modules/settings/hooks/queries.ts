import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../service";

// ============ GET ADS ===========
export function useGetSettings(id:number) {
    return useQuery({
        queryKey:["settings",id],
        queryFn:()=>getSettings(id)
    })
}