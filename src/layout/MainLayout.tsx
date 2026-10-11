import { Outlet, useLocation } from 'react-router-dom'
import NavigationBar from '@/Components/navigationbar'
import { useEffect, useState } from 'react'

function MainLayout() {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState('Home')

  useEffect(() => {
    if (location.hash === '#competitions') {
      setActiveItem('IBCC')
    } else if (location.hash === '#merchandise') {
      setActiveItem('Merchandise')
    } else if (location.pathname === '/about') {
      setActiveItem('About')
    } else if (location.pathname === '/') {
      setActiveItem('Home')
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] relative">
      <NavigationBar activeItem={activeItem} />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
