import { Outlet } from 'react-router-dom'
import NavigationBar from '@/Components/navigationbar'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
