import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import ScrollToTop from '@/components/ScrollToTop'
import HomePage from '@/pages/HomepageTemp'
import NotFoundPage from '@/pages/NotFoundPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import LoginPage from '@/pages/auth/LoginPage'
import TeamRegistrationPage from '@/pages/user/TeamRegistrationPage'
import AboutPage from '@/pages/AboutPage'
import IbccPage from '@/pages/IbccPage'
import MerchandisePage from '@/pages/MerchandisePage'

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ibcc" element={<IbccPage />} />
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/team-register" element={<TeamRegistrationPage />} />
      </Routes>
    </>
  )
}

export default AppRoutes
