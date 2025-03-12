import { useMutation } from "@tanstack/react-query";
import { BrandCategoryType } from "../types";
import { createBrandCategory, deleteBrandCategory, updateBrandCategory } from "../service";
import { openNotification } from "@utils";
import { useQueryClient } from "@tanstack/react-query";


// ============CREATE BRAND CATEGORY============
export function useCreateBrandCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: BrandCategoryType) => createBrandCategory(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error, variables) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["brand-category", { id: variables.id }] })
            }
        }
    })
}

// ============UPDATE BRAND CATEGORY============
export function useUpdateBrandCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: BrandCategoryType) => updateBrandCategory(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error, variables) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["brand-category", { id: variables.id }] })
            }
        }
    })
}
// ============DELETE BRAND CATEGORY============
export function useDeleteBrandCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id:number|string) => deleteBrandCategory(id),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["brand-category"] })
            }
        }
    })
}