import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrandCategoryById, getBrandsById, getCategory, getProducts } from "../service";

// ============GET PRODUCTS============
export function useGetProducts(params:ParamsType) {
    return useQuery({
        queryKey:["products",params],
        queryFn:()=>getProducts(params)
    })
}
// ============GET CATEGORY============
export function useGetCategory() {
    return useQuery({
        queryKey:["category"],
        queryFn:()=>getCategory()
    })
}
// ============GET BRAND BY CATEGORY ID============
export function useGetBrand(id: number) {
    return useQuery({
        queryKey:["brands",id],
        queryFn:()=>getBrandsById(id)
    })
}
// ============GET BRAND CATEGORY BY BRAND ID============
export function useGetBrandCategory(id: number) {
    return useQuery({
        queryKey:["brand-category",id],
        queryFn:()=>getBrandCategoryById(id)
    })
}
