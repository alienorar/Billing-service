import { useQuery } from "@tanstack/react-query";
import { getCategory, getSubCategory } from "../service";
// import { ParamsType } from "@types";

// ============= GET CATEGORIES ============
export function useGetCategory() {
    return useQuery({
        queryKey:["category"],
        queryFn:()=> getCategory()
    })
}
// ============= GET SUB CATEGORIES ============
export function useGetSubCategory(parent_category_id:number){
return useQuery({
    queryKey:["sub-category"],
    queryFn:()=> getSubCategory(parent_category_id)
})
}

