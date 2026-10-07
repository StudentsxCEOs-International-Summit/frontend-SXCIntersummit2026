import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import HomePage from '@/Pages/HomepageTemp'
import NotFoundPage from '@/Pages/NotFoundPage'
import AboutPage from '@/Components/about/AboutPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
