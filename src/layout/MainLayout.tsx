import { Outlet, useLocation } from 'react-router-dom'
import NavigationBar from '@/components/NavigationBar'
import BroadcastModal from '@/components/BroadcastModal'
import { useEffect, useState } from 'react'

function MainLayout() {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState('Home')

  useEffect(() => {
    if (location.pathname === '/ibcc' || location.hash === '#competitions') {
      setActiveItem('IBCC')
    } else if (location.pathname.startsWith('/competition/')) {
      setActiveItem('Competition')
    } else if (location.pathname.startsWith('/events/')) {
      setActiveItem('Events')
    } else if (location.pathname === '/gallery') {
      setActiveItem('Gallery')
    } else if (location.pathname === '/contact') {
      setActiveItem('Contact')
    } else if (location.pathname === '/merchandise') {
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
      <BroadcastModal />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
