import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Brain, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Building2, Globe, Users, ShieldCheck } from 'lucide-react'

const orgRegisterSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] })

type OrgRegisterFormValues = z.infer<typeof orgRegisterSchema>

export default function RegisterOrg() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<OrgRegisterFormValues>({
    resolver: zodResolver(orgRegisterSchema),
    defaultValues: { companyName: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: OrgRegisterFormValues) => {
    setIsLoading(true)
    setError(null)

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { first_name: data.firstName, last_name: data.lastName, role: 'org_admin' } }
    })

    if (authError) { setError(authError.message); setIsLoading(false); return }

    if (authData.user) {
      await supabase.from('users').insert({
        id: authData.user.id,
        email: data.email,
        role: 'org_admin',
        first_name: data.firstName,
        last_name: data.lastName,
      })

      const { data: orgData } = await supabase
        .from('organizations')
        .insert({ name: data.companyName, subscription_status: 'trial' })
        .select().single()

      if (orgData) {
        await supabase.from('org_members').insert({
          org_id: orgData.id,
          user_id: authData.user.id,
          role: 'org_admin',
        })
      }
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-floating border border-slate-100"
        >
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Organization Created!</h2>
          <p className="text-slate-500 mb-8">Verify your email, then log in to start building your assessment pipeline.</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-secondary/30"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hero-mesh bg-slate-50 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(at 40% 20%, hsla(245,100%,70%,0.3) 0px, transparent 50%)' }} />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">AI HR Assessment</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Start hiring smarter.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">14-day free trial.</span>
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: 'Unlimited Candidates', desc: 'During your trial period' },
              { icon: ShieldCheck, label: 'AI Code Review', desc: 'Powered by GPT-4o' },
              { icon: Globe, label: '50+ Templates', desc: 'Ready-to-use assessments' },
              { icon: Building2, label: 'Team Access', desc: 'Invite your whole team' },
            ].map((feature) => (
              <div key={feature.label} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <feature.icon className="w-5 h-5 text-indigo-400 mb-2" />
                <div className="text-sm font-bold text-white">{feature.label}</div>
                <div className="text-xs text-slate-400">{feature.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">SC</div>
            <div>
              <p className="text-white text-sm font-semibold">"We cut our technical screening time by 75% in the first month."</p>
              <p className="text-slate-400 text-xs mt-1">Sarah Chen, VP Engineering at TechFlow</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-slate-500 text-sm">© 2026 AI HR Assessment Inc.</div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg py-8"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">AI HR Assessment</span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Register your organization</h1>
          <p className="text-slate-500 mb-8">Start your 14-day free trial. No credit card required.</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Company Name</label>
              <input
                {...form.register('companyName')}
                placeholder="Acme Corp"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
              />
              {form.formState.errors.companyName && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Admin First Name</label>
                <input {...form.register('firstName')} placeholder="Sarah" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all" />
                {form.formState.errors.firstName && <p className="text-xs text-red-500 mt-1">{form.formState.errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Admin Last Name</label>
                <input {...form.register('lastName')} placeholder="Chen" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all" />
                {form.formState.errors.lastName && <p className="text-xs text-red-500 mt-1">{form.formState.errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email</label>
              <input type="email" {...form.register('email')} placeholder="admin@company.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all" />
              {form.formState.errors.email && <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...form.register('password')}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.formState.errors.password && <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                <input type="password" {...form.register('confirmPassword')} placeholder="Re-enter password" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all" />
                {form.formState.errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{form.formState.errors.confirmPassword.message}</p>}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-secondary/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating Organization...</> : 'Start Free Trial'}
            </button>

            <p className="text-center text-xs text-slate-400">
              By signing up, you agree to our{' '}
              <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and{' '}
              <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
            </p>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary hover:underline font-semibold">Sign in</Link>
          </p>
          <p className="text-center text-sm text-slate-500 mt-2">
            Registering as a candidate?{' '}
            <Link to="/register" className="text-secondary hover:underline font-semibold">Register here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
