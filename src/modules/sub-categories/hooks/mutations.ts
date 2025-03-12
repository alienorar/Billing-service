import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SubCreate } from "../types";
import { createSubCategory, updateSubCategory } from "../service";
import { openNotification } from "@utils";

// ===============CREATE SUB CATEGORY =============
export function useCreateSubCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: SubCreate) => createSubCategory(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["sub-category"] })
            }
        }
    })
}

// ============ UPDATE SUB CATEGORY ===========
export function useUpdateSubCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: SubCreate) => updateSubCategory(data),
        onSuccess: (data) => {
            // console.log(data);
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_,error) => {
            if (error) {
                openNotification("error", "Error", error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey:["sub-category"] })
            }
        }
    })
}