import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory, deleteCategory, updateCategory } from "../service";
import { CategoryType } from "../types";
import { openNotification } from "@utils";

// ============CREATE CATEGORY============
export function useCreateCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CategoryType) => createCategory(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.message)
        },
        onSettled: (_, error, variables) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["category", { id: variables.id }] })
            }
        }

    })
}

// ============UPDATE CATEGORY============
export function useUpdateCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CategoryType) => updateCategory(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error, variables) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["category", { id: variables.id }] })
            }
        }

    })
}
// ============DELETE CATEGORY============
export function useDeleteCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number | string) => deleteCategory(id),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["category"] })
            }
        }

    })
}