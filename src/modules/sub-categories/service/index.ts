import axiosInstance from "@api";
import { SubCreate } from "../types";

// ============ GET CATEGORY============
export async function getCategory() {
    return await axiosInstance.get("category/search",)
}
// ========== GET SUB CATEGORY==========
export async function getSubCategory(parent_category_id:number|string|undefined) {
    return await axiosInstance.get(`/sub-category/search/${parent_category_id}`)
}
// ========== CREATE SUB CATEGORY==========
export async function createSubCategory(data:SubCreate) {
    return await axiosInstance.post("/sub-category/create",data)
}

// ============UPDATE CATEGORY=============
export async function updateSubCategory(data:SubCreate) {
    const {id} = data ;
    delete data.id
    const response = await axiosInstance.patch(`/sub-category/update/${id}`,data)
    return response.data

}
