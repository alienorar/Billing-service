import { GlobalModalProps } from "@types";

// =========== BRAND CATEGORY TYPE===========
export interface BrandCategoryType{
    id?:number|string,
    name?: string,
    brand_id?: number|string,
}

// ===========  CATEGORY  MODAL TYPE===========
export interface BrandCategoryModal extends GlobalModalProps {
update?:BrandCategoryType,
parentBrand?:any[],
}
