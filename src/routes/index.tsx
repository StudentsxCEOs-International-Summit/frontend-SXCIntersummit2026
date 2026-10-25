import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import ScrollToTop from '@/components/ScrollToTop'
import RequireAuth from '@/components/RequireAuth'
import HomePage from '@/pages/HomepageTemp'
import NotFoundPage from '@/pages/NotFoundPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import LoginPage from '@/pages/auth/LoginPage'
import VerifyOtpPage from '@/pages/auth/VerifyOtpPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'
import TeamRegistrationPage from '@/pages/user/TeamRegistrationPage'
import MyTeamPage from '@/pages/user/MyTeamPage'
import AboutPage from '@/pages/AboutPage'
import IbccPage from '@/pages/IbccPage'
import MerchandisePage from '@/pages/MerchandisePage'
import GalleryPage from '@/pages/GalleryPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsOfServicePage from '@/pages/TermsOfServicePage'
import RequireStaff from '@/components/RequireStaff'
import AdminLayout from '@/layout/AdminLayout'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import OverviewPage from '@/pages/admin/OverviewPage'
import TeamsPage from '@/pages/admin/TeamsPage'
import ParticipantsPage from '@/pages/admin/ParticipantsPage'
import FilesPage from '@/pages/admin/FilesPage'
import SemifinalPage from '@/pages/admin/SemifinalPage'
import SettingsPage from '@/pages/admin/SettingsPage'

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
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route
            path="/my-team"
            element={
              <RequireAuth>
                <MyTeamPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Committee console (staff accounts only) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireStaff>
              <AdminLayout />
            </RequireStaff>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="participants" element={<ParticipantsPage />} />
          <Route path="files" element={<FilesPage />} />
          <Route path="semifinal" element={<SemifinalPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Auth flow (standalone screens, no site navbar) */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/team-register"
          element={
            <RequireAuth>
              <TeamRegistrationPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  )
}

export default AppRoutes
