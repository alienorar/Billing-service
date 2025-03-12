import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RoleType } from "@types"
import { createRoles } from "../service"
import { openNotification } from "@utils"
import { createBrands, deleteBrands, updateBrands } from "../../brands/service"
import { BrandType } from "../../brands/types"

// ============ CREATE BRANDS ===========
export function useCreateRoles() {
    return useMutation({
        mutationFn:(data:RoleType)=>createRoles(data),
     onSuccess:(data)=>{
         openNotification("success", "Success", data?.data?.message)
     },
     onError:(error)=>{
         openNotification("error", "Error", error?.message)
     }
    })
} 



// ============ CREATE BRANDS ===========
export function useCreateBrands() {
    return useMutation({
        mutationFn:(data:BrandType)=>createBrands(data),
     onSuccess:(data)=>{
         openNotification("success", "Success", data?.data?.message)
     },
     onError:(error)=>{
         openNotification("error", "Error", error?.message)
     }
    })
} 

// ============ UPDATE BRANDS ===========
export function useUpdateBrands() {
    const queryClient = useQueryClient()
  return useMutation({
      mutationFn:(data: BrandType)=> updateBrands(data),
      onSuccess: (data) => {
          openNotification("success", "Success", data?.data?.message)
      },
    onSettled:(_,error,variables)=>{
        if (error) {
          openNotification("error","Error",error?.message)  
        }else{
            queryClient.invalidateQueries({ queryKey: ["brands", { id: variables.id }]})
        }
    }
  })
    
}
// ============ DELETE BRANDS ===========
export function useDeleteBrands() {
    const queryClient = useQueryClient()
  return useMutation({
      mutationFn:(id:number|string)=> deleteBrands(id),
      onSuccess: (data) => {
          openNotification("success", "Success", data?.data?.message)
      },
    onSettled:(_,error)=>{
        if (error) {
          openNotification("error","Error",error?.message)  
        }else{
            queryClient.invalidateQueries({ queryKey: ["brands"]})
        }
    }
  })
    
}

