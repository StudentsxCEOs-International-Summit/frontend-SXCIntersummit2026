import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import HomePage from '@/Pages/HomePage'
import NotFoundPage from '@/Pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
