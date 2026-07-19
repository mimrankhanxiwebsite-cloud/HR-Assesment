import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Building2, Crown, ArrowRight, Star } from 'lucide-react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Zap,
    price: 49,
    period: 'month',
    desc: 'Perfect for small teams just getting started with technical hiring.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    features: [
      '50 assessments/month',
      '5 team members',
      '10 questions per exam',
      'Basic MCQ & T/F tests',
      'Email support',
      'Standard reporting',
    ],
    notIncluded: ['AI Code Review', 'Coding Assessments', 'Custom Branding', 'API Access'],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Star,
    price: 149,
    period: 'month',
    desc: 'The most popular plan for growing engineering teams.',
    color: 'text-primary',
    bg: 'bg-blue-50',
    border: 'border-primary',
    isPopular: true,
    features: [
      '500 assessments/month',
      '25 team members',
      'Unlimited questions',
      'Full coding assessments',
      'AI Code Review (GPT-4o)',
      'Candidate AI ranking',
      'Analytics dashboard',
      'Priority support',
    ],
    notIncluded: ['Dedicated AI pipeline', 'SSO Integration', 'Custom SLA'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Crown,
    price: 499,
    period: 'month',
    desc: 'Custom pricing for large organizations with advanced requirements.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    features: [
      'Unlimited assessments',
      'Unlimited team members',
      'Custom question bank',
      'Dedicated AI pipeline',
      'SSO (SAML/OIDC)',
      'Custom integrations (ATS)',
      'SLA guarantee',
      'Dedicated account manager',
      'Custom branding & domain',
    ],
    notIncluded: [],
  },
]

export default function SubscriptionManagement() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [currentPlan] = useState('professional') // Mock current plan

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Subscription Management</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your plan, billing, and team access.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billing === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
          >
            Annual
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">-20%</span>
          </button>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 flex items-center justify-between text-white shadow-lg shadow-primary/20">
        <div>
          <div className="text-sm font-semibold opacity-80 mb-1">Current Plan</div>
          <div className="text-2xl font-extrabold">Professional</div>
          <div className="text-sm opacity-80 mt-1">Next renewal: August 20, 2026 · $149/month</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm opacity-80">Assessments Used</div>
            <div className="text-2xl font-bold">247 <span className="text-sm font-normal opacity-70">/ 500</span></div>
          </div>
          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '49.4%' }} />
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => {
          const price = billing === 'annual' ? Math.floor(plan.price * 0.8) : plan.price
          const isCurrent = plan.id === currentPlan

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 p-8 flex flex-col transition-all ${
                plan.isPopular ? 'border-primary shadow-lg shadow-primary/10' : `border-slate-100`
              } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  MOST POPULAR
                </div>
              )}
              {isCurrent && (
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  Current Plan
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl ${plan.bg} flex items-center justify-center mb-5`}>
                <plan.icon className={`w-6 h-6 ${plan.color}`} />
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{plan.desc}</p>

              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">${price}</span>
                <span className="text-slate-400 font-medium">/{plan.period}</span>
                {billing === 'annual' && (
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    Save ${(plan.price - price) * 12}/year
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.isPopular ? 'text-primary' : 'text-emerald-500'}`} />
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400 line-through">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-slate-200" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? 'bg-slate-100 text-slate-400 cursor-default'
                    : plan.isPopular
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
                disabled={isCurrent}
              >
                {isCurrent ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : `Upgrade to ${plan.name}`}
                {!isCurrent && <ArrowRight className="w-4 h-4" />}
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-slate-900">Billing History</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {[
            { date: 'Jul 20, 2026', amount: 149, status: 'Paid', invoice: 'INV-2026-007' },
            { date: 'Jun 20, 2026', amount: 149, status: 'Paid', invoice: 'INV-2026-006' },
            { date: 'May 20, 2026', amount: 149, status: 'Paid', invoice: 'INV-2026-005' },
          ].map((row) => (
            <div key={row.invoice} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">{row.invoice}</div>
                <div className="text-sm text-slate-400">{row.date}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="font-bold text-slate-900">${row.amount}</div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  {row.status}
                </span>
                <button className="text-sm text-primary hover:underline font-medium">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
