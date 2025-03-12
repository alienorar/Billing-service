import { GlobalModalProps } from "@types"

// =========CREATE AND UPDATE ==========
export interface CategoryType {
    name?:string,
    id?:number|string,

}
// ============MODAL==============
export interface CategoryModal extends GlobalModalProps {
    update:CategoryType,
}

