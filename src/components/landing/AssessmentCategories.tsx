import { motion } from 'framer-motion'
import { Code2, Terminal, Briefcase, Database, Cloud, FileText } from 'lucide-react'

const CATEGORIES = [
  {
    title: 'Technical Tests',
    icon: Terminal,
    desc: 'Framework-specific questions (React, Node, Django) and language syntax.',
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20',
  },
  {
    title: 'Coding Challenges',
    icon: Code2,
    desc: 'Algorithm and data structure problems with automated unit testing.',
    gradient: 'from-emerald-400 to-emerald-600',
    shadow: 'shadow-emerald-500/20',
  },
  {
    title: 'System Design',
    icon: Cloud,
    desc: 'Architecture scenarios, scalability, databases, and microservices.',
    gradient: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-500/20',
  },
  {
    title: 'Behavioral Tests',
    icon: Briefcase,
    desc: 'Situational judgment tests and cultural fit evaluations.',
    gradient: 'from-amber-400 to-orange-500',
    shadow: 'shadow-amber-500/20',
  },
  {
    title: 'Database & SQL',
    icon: Database,
    desc: 'Complex queries, schema design, and query optimization tasks.',
    gradient: 'from-rose-400 to-red-500',
    shadow: 'shadow-rose-500/20',
  },
  {
    title: 'Personality Assessments',
    icon: FileText,
    desc: 'Validated psychometric testing to understand candidate traits.',
    gradient: 'from-cyan-400 to-blue-500',
    shadow: 'shadow-cyan-500/20',
  },
]

export default function AssessmentCategories() {
  return (
    <section id="assessments" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Test anything, <span className="text-primary">accurately.</span>
            </h2>
            <p className="text-lg text-slate-600">
              Access our library of 50+ scientifically validated assessment templates, or build your own custom tests using our intuitive builder.
            </p>
          </div>
          <button className="whitespace-nowrap bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold transition-colors">
            View All Categories
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group relative p-8 rounded-2xl overflow-hidden cursor-pointer shadow-lg ${cat.shadow} hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              {/* Mesh overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />

              <div className="relative z-10 flex flex-col h-full text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">
                  {cat.desc}
                </p>
                <div className="text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore <span aria-hidden="true">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
