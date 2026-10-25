import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, ArrowRight, Check, ArrowLeft } from 'lucide-react'
import type { LoginFormState } from '@/types/login'
import { validateLoginForm } from '@/utils/validation/loginValidation'
import { FormField, Dot } from '@/components/ui'
import { RegisterHeroPanel, CurveBackground } from '@/components/auth'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import logo from '@/assets/ic-icon-internasional.svg'
import lockIcon from '@/assets/ic-lock.svg'
import { usePageTitle } from '@/hooks/usePageTitle'
import { authService } from '@/services/auth'
import { ApiError } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

const initialFormState: LoginFormState = {
  email: '',
  password: '',
  rememberMe: false,
}

export default function LoginPage() {
  usePageTitle('Login')
  const [form, setForm] = useState<LoginFormState>(initialFormState)
  const [errors, setErrors] = useState<ReturnType<typeof validateLoginForm>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, user, loading } = useAuth()
  const routeState = location.state as { from?: string; notice?: string } | null

  // Already signed in: there is nothing to do here (this also covers the moment right after login).
  if (!loading && user) return <Navigate to={routeState?.from ?? '/'} replace />

  const updateField =
    <K extends keyof LoginFormState>(key: K) =>
    (value: LoginFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const fieldErrors = validateLoginForm(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) return

    try {
      setIsSubmitting(true)
      const { user } = await authService.login({ email: form.email.trim(), password: form.password })
      setUser(user)
      navigate(routeState?.from ?? '/', { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message)
        if (error.fieldErrors.email) setErrors((prev) => ({ ...prev, email: error.fieldErrors.email }))
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ds-white font-body">
      <style>{`
        input[type='password']::-ms-reveal,
        input[type='password']::-ms-clear { display: none; }
        input[type='password']::-webkit-credentials-auto-fill-button,
        input[type='password']::-webkit-contacts-auto-fill-button {
          visibility: hidden;
          display: none !important;
        }
      `}</style>

      <img src={diamonds} alt="" aria-hidden="true" className="animate-sway pointer-events-none absolute -top-6 -right-14 z-[2] w-40 rotate-45 select-none sm:-right-16 sm:w-56" />
      <div className="pointer-events-none absolute -right-12 top-0 z-[2] h-42 w-42 -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-brand-gold/60 via-cream/40 to-transparent blur-3xl sm:h-80 sm:w-80" />
      <img src={starGlow} alt="" aria-hidden="true" className="animate-twinkle pointer-events-none absolute -right-16 -bottom-10 z-[2] w-40 rotate-12 select-none sm:w-60" />
      <CurveBackground className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden h-full w-[57%] lg:block" />

      <div className="relative flex h-full w-full flex-col lg:flex-row">
        <RegisterHeroPanel />

        {/* Compact brand header, mobile/tablet only */}
        <div className="relative flex items-center justify-center gap-3 px-6 pt-6 sm:pt-8 lg:hidden">
          <Link
            to="/"
            className="absolute left-6 inline-flex items-center gap-1.5 rounded-full border border-brand-blue-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-blue-700 shadow-sm backdrop-blur-md transition-all hover:bg-white active:scale-95"
            aria-label="Back to Home"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <img src={logo} alt="StudentsxCEOs" className="h-10 w-10 sm:h-12 sm:w-12" />
          <div className="leading-tight">
            <p className="font-heading text-sm font-bold text-brand-blue-700">StudentsxCEOs</p>
            <p className="text-xs text-brand-blue-muted">International Summit 2026</p>
          </div>
        </div>

        {/* Right form */}
        <div className="flex w-full flex-1 items-center justify-center overflow-hidden px-6 py-4 sm:px-8 sm:py-6 lg:px-16 lg:py-6 xl:px-24">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative z-10 w-full max-w-md rounded-2xl border border-white bg-ds-white p-5 shadow-ds-lg sm:p-6 md:p-8"
          >
            <p className="flex items-center gap-1 text-caption font-semibold uppercase tracking-wide text-brand-gold">
              <span>StudentsxCEOs</span>
              <Dot />
              <span>2026</span>
            </p>
            <h2 className="mt-1.5 font-heading text-xl font-extrabold text-brand-blue-700 sm:text-2xl">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-brand-blue-muted sm:text-base">
              Login to continue your journey
            </p>

            {routeState?.notice && (
              <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {routeState.notice}
              </div>
            )}

            {formError && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </div>
            )}

            <div className="mt-5 space-y-4">
              <FormField
                id="email"
                label="Email Address"
                icon={<Mail className="h-4 w-4" />}
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => updateField('email')(e.target.value)}
                error={errors.email}
              />

              <FormField
                id="password"
                label="Password"
                icon={<img src={lockIcon} alt="" className="h-4 w-4" />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => updateField('password')(e.target.value)}
                error={errors.password}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-brand-blue-muted hover:text-brand-blue-900"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#185A9D]">
                  <span className="relative inline-flex h-4 w-4 shrink-0">
                    <input
                      type="checkbox"
                      checked={form.rememberMe}
                      onChange={(e) => updateField('rememberMe')(e.target.checked)}
                      className="peer h-4 w-4 shrink-0 appearance-none rounded border border-[#D8E7F4] bg-white checked:border-brand-blue-700 checked:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Check
                      className="pointer-events-none absolute inset-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </span>
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="font-medium text-brand-blue-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-gloss text-outline-sm font-heading mt-1 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/90 text-sm font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#f4a300]/40 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  'Logging in'
                ) : (
                  <>
                    LOGIN
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-brand-blue-muted">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-bold text-brand-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
