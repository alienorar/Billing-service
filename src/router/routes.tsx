import {
    DropboxOutlined,
    AppstoreOutlined,
    StockOutlined,
    SlackOutlined,
    ProductOutlined,
    SettingOutlined,
    TrademarkCircleOutlined,
} from '@ant-design/icons';


export const adminRights = [
    { path: '/super-admin-panel', label: 'Products', icon: <DropboxOutlined style={{ fontSize: "22px" }} /> },
    { path: '/super-admin-panel/categories', label: 'Categories', icon: < AppstoreOutlined style={{ fontSize: "22px" }} /> },
    { path: '/super-admin-panel/brands', label: 'Brands', icon: < SlackOutlined style={{ fontSize: "22px" }} /> },
    { path: '/super-admin-panel/brand-categories', label: 'Brand category', icon: <ProductOutlined style={{ fontSize: "22px" }} /> },
    { path: '/super-admin-panel/ads', label: 'Ads', icon: < TrademarkCircleOutlined style={{ fontSize: "22px" }} /> },
    { path: '/super-admin-panel/stock', label: 'Stock', icon: < StockOutlined style={{ fontSize: "22px" }} /> },
    { path: '/super-admin-panel/settings', label: 'Settings', icon: < SettingOutlined style={{ fontSize: "22px" }} /> },
];

