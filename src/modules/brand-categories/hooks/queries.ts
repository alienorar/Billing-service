import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrandCategory, getBrands } from "../service";

// ============GET BRAND CATEGORY============
export function useGetBrandcategory(params:ParamsType) {
    return useQuery({
        queryKey:["brand-category",params],
        queryFn:()=>getBrandCategory(params)
    })
}
// ===============GET BRANDS==================
export function useGetBrands() {
    return useQuery({
        queryKey:["brand"],
        queryFn:()=>getBrands()
    })
}