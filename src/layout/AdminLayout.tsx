import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import logo from '@/assets/ic-icon-internasional.svg'
import { useAuth } from '@/context/AuthContext'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/teams', label: 'Registrations' },
  { to: '/admin/participants', label: 'Participants' },
  { to: '/admin/files', label: 'Files & Links' },
  { to: '/admin/semifinal', label: 'Semifinal' },
  { to: '/admin/settings', label: 'Settings' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const signOut = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#F4F8FE] font-body">
      <header className="sticky top-0 z-40 bg-[linear-gradient(100deg,#0262F4_0%,#0b4fd1_60%,#003F9E_100%)] shadow-[0_4px_18px_rgba(0,63,158,0.35)]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-9 w-9 rounded-full bg-white p-1" />
            <div className="leading-tight text-white">
              <p className="font-heading text-sm font-extrabold">Admin Console</p>
              <p className="text-xs text-white/75">SxC International Summit 2026</p>
            </div>
          </div>

          <nav aria-label="Admin sections" className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] xl:order-none xl:w-auto xl:flex-1 xl:pb-0 [&::-webkit-scrollbar]:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `font-heading shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none ${
                    isActive ? 'bg-white text-[#0b4fd1] shadow' : 'text-white/90 hover:bg-white/15'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 text-white">
            <span className="hidden max-w-[200px] truncate text-sm text-white/85 sm:block">{user?.name}</span>
            <button
              type="button"
              onClick={signOut}
              className="font-heading inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-white/70 bg-white/15 px-4 text-sm font-bold transition hover:bg-white/25 focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
