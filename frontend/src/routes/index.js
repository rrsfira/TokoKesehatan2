// All components mapping with path for internal routes

import { lazy } from 'react'
import Vendors from '../features/vendors'

const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Product = lazy(() => import('../pages/protected/product'))
const Cart = lazy(() => import('../pages/protected/cart'))
const ProfileInfo = lazy(() => import('../pages/protected/profile'))
const ProductDetail = lazy(() => import('../pages/protected/productDetail'))
const Invoice = lazy(() => import('../pages/protected/invoice'))

const DashboardAdmin = lazy(() => import('../pages/protected/DashboardAdmin'))
const CategoriesAdmin = lazy(() => import('../pages/protected/categoriesAdmin'))
const UsersAdmin = lazy(() => import('../pages/protected/userAdmin'))
const ProductAdmin = lazy(() => import('../pages/protected/productAdmin'))
const TransactionAdmin = lazy(() => import('../pages/protected/transactionAdmin'))
const vendors = lazy(() => import('../pages/protected/vendorAdmin'))

const routes = [
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },

  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },

  {
    path: '/Product', // the url
    component: Product, // view rendered
  },

  {
    path: '/Product/:id', // the url
    component: ProductDetail, // view rendered
  },

  {
    path: '/Cart', // the url
    component: Cart, // view rendered
  },

  {
    path: '/Invoice', // the url
    component: Invoice, // view rendered
  },


  {
    path: '/profileInfo', // the url
    component: ProfileInfo, // view rendered
  },
  
  {
    path: '/dashboardAdmin', // the url
    component: DashboardAdmin, // view rendered
  },

  {
    path: '/categoriesAdmin', // the url
    component: CategoriesAdmin, // view rendered
  },

  {
    path: '/userAdmin', // the url
    component: UsersAdmin, // view rendered
  },

  {
    path: '/productAdmin', // the url
    component: ProductAdmin, // view rendered
  },

  {
    path: '/transactionAdmin', // the url
    component: TransactionAdmin, // view rendered
  },

  {
    path: '/vendorAdmin', // the url
    component: Vendors, // view rendered
  },



]

export default routes
