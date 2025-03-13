import { useQuery } from "@tanstack/react-query";
import { getPermessions, getRoles } from "../service";
import { ParamsType, RolesResponse } from "@types";

// ============ GET PERMESSIONS ===========
export function useGetPermessions() {
    return useQuery({
        queryKey: ["permessions"],
        queryFn: () => getPermessions()
    })
}
// ============ GET ROLES ===========
export const useGetRoles = (params: ParamsType) => {
    return useQuery<RolesResponse, Error>({
      queryKey: ["roles", params] as const,  
      queryFn: () => getRoles(params), 
    });
  };
  
