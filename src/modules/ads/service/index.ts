import axiosInstance from "@api";
import { CreateAds } from "../types";
import { ParamsType } from "@types";


// ============ GET ADS ===========
export async function getAds(params:ParamsType) {
    return await axiosInstance.get(`/ads`, { params })
}

// ============CREATE ADS==========
export async function createAds(data:CreateAds) {
    return await axiosInstance.post("ads/create", data)
}

// ============ DELETE ADS ===========
export async function deleteAds(id: number | string) {
    const response = await axiosInstance.delete(`/ads/delete/${id}`)
    return response?.data
}