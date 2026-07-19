import { motion } from 'framer-motion'
import { Brain, Code2, Users, CheckCircle2, ShieldCheck, LineChart } from 'lucide-react'

const FEATURES = [
  {
    title: 'AI Candidate Evaluation',
    description: 'Our proprietary AI models analyze code quality, logic, and problem-solving patterns beyond just correct output.',
    icon: Brain,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    title: 'Coding Assessments',
    description: 'Integrated Monaco Editor with multi-language support, real-time compilation, and automated test cases.',
    icon: Code2,
    color: 'text-primary',
    bg: 'bg-blue-50',
  },
  {
    title: 'Behavioral Analysis',
    description: 'Advanced personality and cultural fit assessments mapped to your core values.',
    icon: Users,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Automated Scoring',
    description: 'Instant, bias-free grading and standardized scorecards delivered immediately upon completion.',
    icon: CheckCircle2,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Secure Online Exams',
    description: 'Enterprise-grade anti-cheat system with tab tracking, fullscreen enforcement, and copy-paste detection.',
    icon: ShieldCheck,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    title: 'Advanced Analytics',
    description: 'Benchmark candidates against global averages and visualize team skill gaps with deep analytics.',
    icon: LineChart,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Everything you need to build a world-class team
          </h2>
          <p className="text-lg text-slate-600">
            A comprehensive suite of tools designed to identify top talent, reduce hiring bias, and accelerate your recruitment pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-brand-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
