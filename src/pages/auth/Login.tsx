import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { Brain, Eye, EyeOff, Loader2, AlertCircle, User, Building2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginType = 'candidate' | 'organization'

export default function Login() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState<LoginType>('candidate')
  const navigate = useNavigate()
  const { setUser, setSession } = useAuthStore()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (authData.user) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profile) {
        setUser(profile)
        setSession(authData.session)

        // Role-based routing
        if (profile.role === 'platform_admin') {
          navigate('/admin/dashboard', { replace: true })
        } else if (['org_admin', 'recruiter', 'hiring_manager'].includes(profile.role)) {
          navigate('/org/dashboard', { replace: true })
        } else {
          navigate('/candidate/dashboard', { replace: true })
        }
      }
    }
    setIsLoading(false)
  }

  const handleOAuth = async (provider: 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen bg-hero-mesh bg-slate-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">AI HR Assessment</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
              Welcome back to<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">smarter hiring.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Access your assessments, review candidate results, and build better teams with AI-powered insights.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Candidates Assessed', value: '10K+' },
              { label: 'Hiring Accuracy', value: '95%' },
              { label: 'Companies', value: '500+' },
              { label: 'Templates', value: '50+' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-slate-500 text-sm">
          © 2026 AI HR Assessment Inc.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">AI HR Assessment</span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Sign in</h1>
          <p className="text-slate-500 mb-8">Access your dashboard and manage assessments.</p>

          {/* Login Type Toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setLoginType('candidate')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                loginType === 'candidate'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" /> Candidate
            </button>
            <button
              type="button"
              onClick={() => setLoginType('organization')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                loginType === 'organization'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4" /> Organization
            </button>
          </div>

          {/* OAuth */}
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all mb-6 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-1 border-t border-slate-200" />
            <span className="px-4 text-slate-400 text-xs font-medium">or continue with email</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder={loginType === 'organization' ? 'org@company.com' : 'you@example.com'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...form.register('password')}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>
              )}
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5 disabled:translate-y-0 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                `Sign in as ${loginType === 'candidate' ? 'Candidate' : 'Organization'}`
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            {loginType === 'candidate' ? (
              <>
                No account yet?{' '}
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  Register as Candidate
                </Link>
              </>
            ) : (
              <>
                New organization?{' '}
                <Link to="/register-org" className="text-primary hover:underline font-semibold">
                  Sign up here
                </Link>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
