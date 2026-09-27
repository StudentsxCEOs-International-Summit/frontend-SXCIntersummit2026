import { Outlet } from 'react-router-dom'
import NavigationBar from '@/Components/navigationbar'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] relative">
      <NavigationBar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
