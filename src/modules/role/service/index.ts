import axiosInstance from "@api";
import { ParamsType, RoleType } from "@types";


// ============ CREATE ROLE ===========
export async function createRoles(data: RoleType) {
    return await axiosInstance.post("api/v1/role/create", data)
}

// ============ GET PERMESSIONS =========
export async function getPermessions() {
    return (await axiosInstance.get("api/v1/role/permission/list")).data?.data
}

//============= GET ROLES ===============
export async function getRoles(params: ParamsType) {
    return (await axiosInstance.get(`api/v1/role/list`, { params })).data
  }
  