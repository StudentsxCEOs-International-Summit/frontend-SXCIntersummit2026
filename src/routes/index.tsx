import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import TeamRegistrationPage from '@/pages/user/TeamRegistrationPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/team-register" element={<TeamRegistrationPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
