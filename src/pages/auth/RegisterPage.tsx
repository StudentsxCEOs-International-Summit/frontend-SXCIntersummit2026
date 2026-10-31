import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { User, Mail, Eye, EyeOff, ArrowRight, Check, ArrowLeft } from 'lucide-react'
import type { RegisterFormState } from '@/types/register'
import { PASSWORD_REQUIREMENTS, validateRegisterForm } from '@/utils/validation/registerValidation'
import { FormField, PasswordChecklist, Dot } from '@/components/ui'
import { RegisterHeroPanel, CurveBackground } from '@/components/auth'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import logo from '@/assets/ic-icon-internasional.svg'
import lockIcon from '@/assets/ic-lock.svg'
import { usePageTitle } from '@/hooks/usePageTitle'
import { authService } from '@/services/auth'
import { ApiError } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

const initialFormState: RegisterFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
}

export default function RegisterPage() {
  usePageTitle('Register')
  const [form, setForm] = useState<RegisterFormState>(initialFormState)
  const [errors, setErrors] = useState<ReturnType<typeof validateRegisterForm>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  // Already signed in: skip account creation and go straight to the team registration.
  if (!loading && user) return <Navigate to="/team-register" replace />

  const updateField =
    <K extends keyof RegisterFormState>(key: K) =>
    (value: RegisterFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const fieldErrors = validateRegisterForm(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) return

    try {
      setIsSubmitting(true)
      const email = form.email.trim()
      await authService.register({ name: form.fullName.trim(), email, password: form.password })
      navigate('/verify-otp', { state: { email, purpose: 'register' } })
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message)
        const { name, email, password } = error.fieldErrors
        setErrors((prev) => ({ ...prev, fullName: name ?? prev.fullName, email: email ?? prev.email, password: password ?? prev.password }))
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-landing font-body lg:bg-ds-white">
      <style>{`
        input[type='password']::-ms-reveal,
        input[type='password']::-ms-clear { display: none; }
        input[type='password']::-webkit-credentials-auto-fill-button,
        input[type='password']::-webkit-contacts-auto-fill-button {
          visibility: hidden;
          display: none !important;
        }
      `}</style>

      {/* Phones and tablets: the same blue city backdrop as the other pages, so the white card stands out. */}
      <img
        src={building}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-115 origin-center object-cover select-none lg:hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
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
            <p className="text-xs text-brand-blue-700/80">International Summit 2026</p>
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
              Create Your Account
            </h2>
            <p className="mt-1 text-sm text-brand-blue-muted sm:text-base">
              Join StudentsxCEOs International Summit
            </p>

            {formError && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </div>
            )}

            <div className="mt-5 space-y-4">
              <FormField
                id="fullName"
                label="Full Name"
                icon={<User className="h-4 w-4" />}
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => updateField('fullName')(e.target.value)}
                error={errors.fullName}
              />

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

              <div>
                <FormField
                  id="password"
                  label="Password"
                  icon={<img src={lockIcon} alt="" className="h-4 w-4" />}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create your password"
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
                <PasswordChecklist password={form.password} requirements={PASSWORD_REQUIREMENTS} />
              </div>

              <FormField
                id="confirmPassword"
                label="Confirm Password"
                icon={<img src={lockIcon} alt="" className="h-4 w-4" />}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => updateField('confirmPassword')(e.target.value)}
                error={errors.confirmPassword}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="text-brand-blue-muted hover:text-brand-blue-900"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              <div>
                <label className="flex items-start gap-2 text-sm text-[#185A9D]">
                  <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0">
                    <input
                      type="checkbox"
                      checked={form.agreeToTerms}
                      onChange={(e) => updateField('agreeToTerms')(e.target.checked)}
                      aria-invalid={Boolean(errors.agreeToTerms)}
                      className="peer h-4 w-4 shrink-0 appearance-none rounded border border-[#D8E7F4] bg-white checked:border-brand-blue-700 checked:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Check
                      className="pointer-events-none absolute inset-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </span>
                  <span>
                    I agree to the{' '}
                    {/* Opens the Terms of Service page in a new tab, so the form you filled in stays as it is. */}
                    <Link
                      to="/terms-of-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#185A9D] underline-offset-2 hover:underline"
                    >
                      Terms of Service
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gold-gloss text-outline-sm font-heading mt-1 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/90 text-sm font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#f4a300]/40 focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  'Creating account'
                ) : (
                  <>
                    REGISTER
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-brand-blue-muted">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-brand-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
