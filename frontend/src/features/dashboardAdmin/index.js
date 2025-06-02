import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardStats from './components/DashboardStats'
import {
  UsersIcon,
  CubeIcon ,
  Squares2X2Icon ,
  CreditCardIcon,
} from '@heroicons/react/24/outline'

function Dashboard() {
  const [statsData, setStatsData] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resProducts, resCategories, resUsers, resTransaction] = await Promise.all([
          axios.get('http://localhost:5000/api/stats/products'),
          axios.get('http://localhost:5000/api/stats/categories'),
          axios.get('http://localhost:5000/api/stats/users'),
          axios.get('http://localhost:5000/api/stats/transaction'),
        ])
  
        const data = [
          {
            title: 'Produk',
            value: resProducts.data.total,
            icon: <CubeIcon className="w-8 h-8 text-primary-500" />, // Set icon color to primary
            description: resProducts.data.description,
          },
          {
            title: 'Kategori Produk',
            value: resCategories.data.total,
            icon: <Squares2X2Icon className="w-8 h-8 text-primary-500" />, // Set icon color to primary
            description: resCategories.data.description,
          },
          {
            title: 'User',
            value: resUsers.data.total,
            icon: <UsersIcon className="w-8 h-8 text-primary-500" />, // Set icon color to primary
            description: resUsers.data.description,
          },
          {
            title: 'Transaction',
            value: resTransaction.data.total,
            icon: <CreditCardIcon className="w-8 h-8 text-primary-500" />, // Set icon color to primary
            description: resTransaction.data.description,
          },
        ]
  
        setStatsData(data)
      } catch (error) {
        console.error('Gagal mengambil data statistik:', error)
      }
    }
  
    fetchStats()
  }, [])  

  return (
    <>
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => (
          <DashboardStats key={k} {...d} colorIndex={k} />
        ))}
      </div>
    </>
  )
}

export default Dashboard
