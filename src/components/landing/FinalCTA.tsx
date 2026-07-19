import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-hero-mesh opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Transform Your Hiring Process Today
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of innovative companies using AI-powered assessments to hire better talent, faster and without bias.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register-org" 
              className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-white/10 hover:bg-slate-50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-md">
              Book a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
