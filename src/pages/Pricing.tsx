import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, CreditCard, Zap, Building2, Rocket, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Zap,
    price: 49,
    period: '/month',
    description: 'For small teams just getting started.',
    features: [
      '50 assessments/month',
      'Up to 5 team members',
      '10 questions per assessment',
      'Email support',
      'Basic reporting',
    ],
    cta: 'Get Started',
    color: 'border-slate-200',
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Star,
    price: 149,
    period: '/month',
    description: 'The most popular plan for growing teams.',
    features: [
      '500 assessments/month',
      'Up to 25 team members',
      'Unlimited questions',
      'AI Code Review (included)',
      'Advanced analytics & benchmarking',
      'Priority email + chat support',
      'Candidate ranking reports',
    ],
    cta: 'Start Free Trial',
    color: 'border-brand-500',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    price: 499,
    period: '/month',
    description: 'For large organizations with custom needs.',
    features: [
      'Unlimited assessments',
      'Unlimited team members',
      'Custom question bank import',
      'Dedicated AI review pipeline',
      'SSO (SAML/OIDC)',
      'Custom branding',
      '24/7 SLA support',
      'Audit logs & compliance',
    ],
    cta: 'Contact Sales',
    color: 'border-violet-500',
    popular: false,
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const discount = billing === 'annual' ? 0.8 : 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <Rocket className="w-4 h-4" />
            Flexible Pricing for Every Team
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Invest in Better Hiring
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Access AI-powered candidate screening, automated technical assessments, and smart benchmarking at any scale.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
              className={`relative w-12 h-6 rounded-full transition-colors ${billing === 'annual' ? 'bg-brand-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${billing === 'annual' ? 'translate-x-6' : ''}`} />
            </button>
            <span className={`text-sm font-medium ${billing === 'annual' ? 'text-slate-900' : 'text-slate-400'}`}>
              Annual <span className="text-emerald-600 font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => (
            <Card key={plan.id} className={`relative border-2 ${plan.color} ${plan.popular ? 'shadow-brand-lg scale-105' : 'shadow-sm'} transition-all`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pt-8">
                <div className={`w-12 h-12 rounded-2xl ${plan.popular ? 'bg-brand-100' : 'bg-slate-100'} flex items-center justify-center mb-4`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-brand-700' : 'text-slate-600'}`} />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-extrabold text-slate-900">${Math.round(plan.price * discount)}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                  {billing === 'annual' && (
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      Billed as ${Math.round(plan.price * discount * 12)}/year
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-brand-600' : 'text-emerald-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full h-12 text-base font-semibold ${
                    plan.popular 
                      ? 'bg-brand-600 hover:bg-brand-700 text-white' 
                      : 'border-2 border-slate-300 hover:bg-slate-50 text-slate-700 bg-white'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-brand-700 to-brand-500 rounded-2xl p-10 text-white text-center shadow-brand-lg">
          <h2 className="text-3xl font-bold mb-3">Need a custom solution?</h2>
          <p className="text-brand-100 mb-6 text-lg">Talk to our enterprise team about custom integrations, SLA, and dedicated AI pipelines.</p>
          <Button className="bg-white text-brand-700 hover:bg-brand-50 font-bold text-base h-12 px-8">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </div>
  )
}
