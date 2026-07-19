import { motion } from 'framer-motion'

const COMPANIES = [
  { name: 'Acme Corp', logo: 'ACME' },
  { name: 'Global Tech', logo: 'GLOBAL' },
  { name: 'Innovate AI', logo: 'INNOVATE' },
  { name: 'Synergy', logo: 'SYNERGY' },
  { name: 'Nexus', logo: 'NEXUS' },
  { name: 'Quantum', logo: 'QUANTUM' },
]

export default function TrustedCompanies() {
  return (
    <section className="py-10 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-widest">
          Trusted by innovative teams worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {COMPANIES.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-2xl font-black text-slate-800 tracking-tighter"
            >
              {company.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
