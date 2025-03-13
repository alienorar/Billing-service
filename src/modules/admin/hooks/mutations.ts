import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AdminType } from "@types"
import { openNotification } from "@utils"
import { createAdmins, updateAdmins } from "../service"

// ============ CREATE ROLES ===========
export function useCreateAdmin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: AdminType) => createAdmins(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
        onError: (error) => {
            openNotification("error", "Error", error?.message)
        }
    })
}


// ============ UPDATE ADMINS ===========
export function useUpdateAdmin() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:AdminType) => updateAdmins(data),
        onSuccess: (data) => {
            openNotification("success", "Success", data?.data?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                openNotification("error", "Error", error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["admins"] })
            }
        }
    })

}