import { GlobalModalProps } from "@types";
import { CategoryType } from "../../categories/types";

// =============PRODUCT TYPE =============
export interface ProductType {
    name?:string,
    price?:number|string,
    category_id?:number|string,
    brand_id?:number|string,
    brand_category_id?:number|string,
    files?:any,
    id?:number|string,
}

export interface ProductModalProps extends GlobalModalProps {
    update?:ProductType,
    categories?:CategoryType|undefined,
}