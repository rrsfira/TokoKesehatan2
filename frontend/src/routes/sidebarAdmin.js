/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import { FolderIcon, CubeIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline'


const iconClasses = `h-6 w-6`

const routes = [

  {
    path: '/adm/dashboardAdmin',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Beranda',
  },
  {
    path: '/adm/categoriesAdmin',
    icon: <FolderIcon className={iconClasses}/>, // Kategori
    name: 'Kategori',
  },
  {
    path: '/adm/productAdmin',
    icon: <CubeIcon className={iconClasses}/>, // Produk
    name: 'Produk',
  },
  {
    path: '/adm/userAdmin',
    icon: <UserIcon className={iconClasses}/>, // User
    name: 'User',
  },
  {
    path: '/adm/transactionAdmin',
    icon: <CreditCardIcon className={iconClasses}/>, // Transaksi
    name: 'Transaksi',
  },
]

export default routes


