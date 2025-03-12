import axiosInstance from "@api";
import { ParamsType } from "@types";
import { BrandType } from "../types";

// ============ GET BRANDS ===========
export async function getBrands(params: ParamsType) {
    return await axiosInstance.get("/brand/search/", { params })
}
// ============ GET BRANDS ===========
export async function getCategory() {
    return await axiosInstance.get("/category/search/")
}

// ============ CREATE BRANDS ===========
export async function createBrands(data: BrandType) {
    return await axiosInstance.post("/brand/create", data)
}
// ============ UPDATE BRANDS ===========
export async function updateBrands(data: BrandType) {
    const { id } = data;
    // console.log(data);
    delete data.id
    const response = await axiosInstance.patch(`/brand/update/${id}`, data)
    return response?.data
}
// ============ DELETE BRANDS ===========
export async function deleteBrands(id:number|string) {
    const response = await axiosInstance.delete(`/brand/delete/${id}`)
    return response?.data
}