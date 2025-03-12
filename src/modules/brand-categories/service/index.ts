import axiosInstance from "@api";
import { ParamsType } from "@types";
import { BrandCategoryType } from "../types";

// ============GET BRAND CATEGORY =============
export async function getBrandCategory(params: ParamsType) {
    return await axiosInstance.get(`brand-category/search/`, { params })
}
// ============GET BRANDS =============
export async function getBrands() {
    return await axiosInstance.get(`/brand/search/`)
}

// ============CREATE BRAND CATEGORY =============
export async function createBrandCategory(data: BrandCategoryType) {
    return await axiosInstance.post("/brand-category/create", data)
}
// ============UDATE BRAND CATEGORY =============
export async function updateBrandCategory(data: BrandCategoryType) {
    const { id } = data;
    delete data.id
    const response = await axiosInstance.patch(`/brand-category/update/${id}`, data)
    return response?.data
}
// ===============DELETE  BRAND  CATEGORY=============
export async function deleteBrandCategory(id: number | string) {
    const response = await axiosInstance.delete(`/brand-category/delete/${id}`,)
    return response?.data
}


