import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrands, getCategory } from "../service";


// ============ GET BRANDS ===========
export function useGetBrands(params:ParamsType) {
    return useQuery({
        queryKey:["brands",params],
        queryFn:()=>getBrands(params)
    })
}

// ============ GET CATEGORY ===========
export function useGetCategory() {
    return useQuery({
        queryKey:["category"],
        queryFn:()=>getCategory()
    })
}