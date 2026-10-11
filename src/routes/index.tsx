import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import HomePage from '@/Pages/HomepageTemp'
import NotFoundPage from '@/Pages/NotFoundPage'
import RegisterPage from '@/Pages/auth/RegisterPage'
import LoginPage from '@/Pages/auth/LoginPage'
import TeamRegistrationPage from '@/Pages/user/TeamRegistrationPage'
import AboutPage from '@/Pages/AboutPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/team-register" element={<TeamRegistrationPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
