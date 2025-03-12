import axiosInstance from "@api";

// ============ GET Settings ===========
export async function getSettings(id:number) {
    return await axiosInstance.get(`/admin/${id}`)
}