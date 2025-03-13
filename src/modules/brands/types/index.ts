import { GlobalModalProps } from "@types";

// ============BRAND CREATE ============
export interface BrandType {
    categoryId?: number,
    description?: string,
    id?: number,
    file?: any,
    name?: string
    category_id?:number
}

// ============BRAND MODAL ============
export interface BrandModalProps extends GlobalModalProps {
    update?:BrandType,
    categories:any[],
}


// delete useless elements and , fix styles 