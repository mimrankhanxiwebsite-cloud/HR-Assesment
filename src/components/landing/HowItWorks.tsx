import { motion } from 'framer-motion'
import { FilePlus2, Mail, BrainCircuit, Trophy } from 'lucide-react'

const STEPS = [
  {
    title: 'Create Assessment',
    description: 'Select from 50+ templates or build a custom technical test with our drag-and-drop builder.',
    icon: FilePlus2,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    title: 'Invite Candidates',
    description: 'Send bulk invites via email or generate a public link for your career page.',
    icon: Mail,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
  },
  {
    title: 'AI Evaluates Performance',
    description: 'Candidates take the test in a secure environment while our AI analyzes code, logic, and behavior.',
    icon: BrainCircuit,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  },
  {
    title: 'Hire Top Talent',
    description: 'Review automated scorecards, compare candidates side-by-side, and make data-driven offers.',
    icon: Trophy,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A seamless, end-to-end recruitment process designed to save you hundreds of hours per hire.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-emerald-200 -z-10" />

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className={`w-24 h-24 rounded-full ${step.bg} flex items-center justify-center mb-6 shadow-sm border-4 border-white group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                
                <div className="absolute top-0 right-1/2 translate-x-[70px] translate-y-8 hidden lg:block">
                  {index < STEPS.length - 1 && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                      className="w-16 h-0.5 bg-indigo-500 origin-left" 
                    />
                  )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full h-full">
                  <div className="text-sm font-bold text-indigo-500 mb-2 uppercase tracking-wider">Step {index + 1}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
