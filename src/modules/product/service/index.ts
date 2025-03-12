import axiosInstance from "@api";
import { ParamsType } from "@types";
import { ProductType } from "../types";

// ============GET PRODUCTS============
export async function getProducts(params: ParamsType) {
    return await axiosInstance.get("/products/search", { params })
}

// ============GET CATEGORY=============
export async function getCategory() {
    return await axiosInstance.get("category/search")
}

// ======GET BRANDS BY CATEGORY ID=======
export async function getBrandsById(id: number|undefined) {
    const response = await axiosInstance.get(`/brand/category/${id}`)
    return response.data?.data
}

// ===GET BRANDS CATEGORY BY BRAND ID====
export async function getBrandCategoryById(id: number | undefined) {
    const response =  await axiosInstance.get(`/brand-category/brand/${id}`)
    return response.data?.data
}

// ============CREATE PRODUCTS============
export async function createProducts(data:any) {
    return await axiosInstance.post("/products/create",data)
}

// ============UPDATE PRODUCT=============
export async function updateProducts(data:ProductType) {
    const { id } = data;
    delete data.id
    const response = await axiosInstance.patch(`/products/update/${id}`, data)
    return response.data

}
// ============DELETE PRODUCT=============
export async function deletePoducts(id: number | string) {
    const response = await axiosInstance.delete(`/products/delete/${id}`,)
    return response?.data
}