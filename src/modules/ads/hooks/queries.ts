import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getAds } from "../service";

// ============ GET ADS ===========
export function useGetAds(params:ParamsType) {
    return useQuery({
        queryKey:["ads",params],
        queryFn:()=>getAds(params)
    })
}