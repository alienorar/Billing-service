import axiosInstance from "@api";
import { ParamsType } from "@types";
import { CategoryType } from "../types";


// ===============GET CATEGORY=============
export async function getCategory(params: ParamsType) {
    return await axiosInstance.get("category/search", { params })
}
// ===============CREATE CATEGORY=============
export async function createCategory(data: CategoryType) {
    return await axiosInstance.post("category/create", data)
}
// ===============UPDATE CATEGORY=============
export async function updateCategory(data: CategoryType,) {
    const { id } = data;
    delete data.id
    const response = await axiosInstance.patch(`/category/update/${id}`, data)
    return response?.data
}
// ===============DELETE CATEGORY=============
export async function deleteCategory(id: number | string) {
    const response = await axiosInstance.delete(`/category/delete/${id}`,)
    return response?.data
}