import { AnyObject } from "antd/es/_util/type";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";

// ========== PARAMS TYPE ==========
export interface ParamsType {
limit:number,
page:number,
search:string,
}


// ========== MODALS TYPE ==========
export interface GlobalModalProps {
    open?: boolean,
    handleClose: () => void,
    getData?: () => void,
}

// ==========GLOBAL TABLE TYPE ==========
export interface TablePropsType {
    columns: ColumnsType<AnyObject>,
    data: AnyObject[] | undefined,
    pagination: false | TablePaginationConfig | undefined,
    handleChange: (pagination: TablePaginationConfig) => void,
}
// ==========GLOBAL DELETE TYPE ==========
export interface ConfirmType {
    onConfirm: (id: number) => void;
    onCancel: () => void,
    id: number | undefined,
    title: string
}

// ============GLOBAL SEARCH=============
export interface SearchType {
    updateParams: (params: ParamsType) => void;
    placeholder?: string;
}