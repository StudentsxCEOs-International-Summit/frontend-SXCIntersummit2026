import { Outlet } from 'react-router-dom'
import NavigationBar from '@/Components/navigationbar'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <NavigationBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
