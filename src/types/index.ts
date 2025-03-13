import { AnyObject } from "antd/es/_util/type";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";

// ========== PARAMS TYPE ==========
export interface ParamsType {
  size?: number,
  page?: number,
  search?: string,
  phone?: number,
  firstName?: string;
  lastName?: string;
}

export interface PagingType {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}


export interface RolesResponse {
  message?: string;
  data: {
    content: RoleType[];
    paging: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };

  };
}

export interface AdminsResponse {
  message?: string | any;
  data: {
    content: AdminType[];
    paging: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };

  };
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


// ===========ROLE TYPE=============
export interface RoleType {
  id?: number;
  name?: string;
  displayName?: string;
  defaultUrl?: string;
  permissions?: number[];
}


export interface RoleModalType extends GlobalModalProps {
  update?: RoleType;
  permessionL?: any[];
}


// ===========ADMIN TYPE=============
export interface AdminType {
  id?: number;
  roleId?: number;
  username?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}


export interface AdminModalType {
  open?: boolean;
  handleClose?: () => void;
  update?: AdminType | null;
  roles?: { id: string; name: string }[];
};
