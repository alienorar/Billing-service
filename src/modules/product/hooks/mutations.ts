import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProductType } from "../types"
import { openNotification } from "@utils"
import { createProducts, deletePoducts, updateProducts } from "../service"

// ===============CREATE PRODUCT =============
export function useCreateProducts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ProductType) => createProducts(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["products"] })
            }
        }
    })
}

// ============ UPDATE PRODUCTS ===========
export function useUpdateProducts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ProductType) => updateProducts(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["products"] })
            }
        }
    })
}

// ============DELETE PRODUCTS============
export function useDeleteProducts() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number | string) => deletePoducts(id),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["products"] })
            }
        }

    })
}

