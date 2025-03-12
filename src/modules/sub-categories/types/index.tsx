import { GlobalModalProps } from "@types"

// =============Modal===========
export interface SubCreate {
    name?: string,
    parent_category_id?: number,
    id?: number
}
export interface SubModalprops extends GlobalModalProps {
    update: SubCreate,
    parent_category_id?: number,
}