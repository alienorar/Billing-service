import loadable from '@loadable/component'
import { Loading } from '@components';
import SignIn from './auth/pages/sign-in'
const AdminPanel = loadable(() => import('./super-admin-panel'), {
  fallback: <Loading />
});
const Products = loadable(() => import('./product/pages'), {
  fallback: <Loading />
});
const Settings = loadable(() => import('./settings/pages'), {
  fallback: <Loading />
});
const ProductDetails = loadable(() => import('./product-details/pages'), {
  fallback: <Loading />
});
const Categories = loadable(() => import('./categories/pages'), {
  fallback: <Loading />
});
const Brands = loadable(() => import('./brands/pages'), {
  fallback: <Loading />
});
const SubCategories = loadable(() => import('./sub-categories/pages'), {
  fallback: <Loading />
});
const BrandCategories = loadable(() => import('./brand-categories/pages'), {
  fallback: <Loading />
});
const Ads = loadable(() => import('./ads/pages'), {
  fallback: <Loading />
});
const Stock = loadable(() => import('./stock/pages'), {
  fallback: <Loading />
});
const AdminPage = loadable(() => import('./admin/pages'), {
  fallback: <Loading />
});
const Role = loadable(() => import('./role/pages'), {
  fallback: <Loading />
});
const Students = loadable(() => import('./students/pages'), {
  fallback: <Loading />
});

const NotFound = loadable(() => import('./not-found'), {
  fallback: <Loading />
});
export {
  SignIn,
  AdminPanel,
  AdminPage,
  Students,
  Role,
  Products,
  Categories,
  Brands,
  SubCategories,
  BrandCategories,
  Ads,
  Stock,
  NotFound,
  Settings,
  ProductDetails
}