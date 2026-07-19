import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Starter',
    price: 49,
    desc: 'For small teams just getting started.',
    features: ['50 assessments/month', 'Up to 5 team members', '10 questions per assessment', 'Basic reporting'],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Professional',
    price: 149,
    desc: 'The most popular plan for growing teams.',
    features: ['500 assessments/month', 'Up to 25 team members', 'Unlimited questions', 'AI Code Review', 'Candidate ranking'],
    cta: 'Start Free Trial',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 499,
    desc: 'For large organizations with custom needs.',
    features: ['Unlimited assessments', 'Unlimited team members', 'Custom question bank', 'Dedicated AI pipeline', 'SSO (SAML/OIDC)'],
    cta: 'Contact Sales',
    isPopular: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your team's hiring needs. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col ${
                plan.isPopular 
                  ? 'border-primary shadow-brand-lg md:-translate-y-4 md:scale-105 z-10' 
                  : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-6 h-10">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-slate-900">${plan.price}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.isPopular ? 'bg-primary text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link 
                to="/register-org" 
                className={`w-full text-center py-4 rounded-xl font-bold transition-all ${
                  plan.isPopular 
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 hover:-translate-y-1' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
