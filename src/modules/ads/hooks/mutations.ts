import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAds, deleteAds } from "../service";
import { openNotification } from "@utils";


// ============ CREATE ADS ===========
export function useCreateAds() {
    return useMutation({
        mutationFn: (data: any) => createAds(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.message)
        },
        onError: (error) => {
            openNotification("error", "Error", error?.message)
        }
    })
}

// ============ DELETE ADS ===========
export function useDeleteAds() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number | string) => deleteAds(id),
        onSuccess: (data: any) => {
            openNotification("success", "Success", data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["brands"] })
            }
        }
    })
}