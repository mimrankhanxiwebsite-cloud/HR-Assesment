import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Menu } from 'lucide-react'

export default function NavigationBar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-foreground tracking-tight">AI HR Assessment</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#assessments" className="hover:text-primary transition-colors">Assessments</a>
          <a href="#dashboard" className="hover:text-primary transition-colors">Dashboard</a>
          <a href="/pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
            Login
          </Link>
          <Link to="/register-org" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  )
}
