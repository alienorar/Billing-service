import axiosInstance from "@api";
import { ParamsType, RolesResponse, RoleType } from "@types";

//============= GET ROLES ===============
export async function getRoles(params: ParamsType): Promise<RolesResponse> {
    return (await axiosInstance.get(`api/v1/role/list`, { params })).data;
}

// ============ CREATE ROLE ===========
export async function createRoles(data: RoleType) {
    return await axiosInstance.post("api/v1/role/create", data)
}

// ============ GET PERMESSIONS =========
export async function getPermessions() {
    return (await axiosInstance.get("api/v1/role/permission/list")).data?.data
}

//============= UPDATE ROLES ===============
export async function updateRoles(params: ParamsType): Promise<RolesResponse> {
    return (await axiosInstance.get(`api/v1/role/list`, { params })).data;
}

//============= DELETE ROLES ===============
export async function deleteRoles(params: ParamsType): Promise<RolesResponse> {
    return (await axiosInstance.get(`api/v1/role/list`, { params })).data;
}



// must add update and delete methods , also delete extra useless elements from component and also type