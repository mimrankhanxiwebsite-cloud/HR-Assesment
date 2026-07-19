import { motion } from 'framer-motion'
import { Sparkles, Play, Star, TrendingUp, CheckCircle, BrainCircuit } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-hero-mesh">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            AI-Powered Recruitment Platform
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Hire Smarter.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Assess Faster.</span><br/>
            Build Better Teams.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed"
          >
            Evaluate candidates using AI-powered technical assessments, aptitude tests, coding challenges, behavioral analysis, automated scoring, and real-time analytics—all in one platform.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link to="/register-org" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 text-center">
              Start Free Trial
            </Link>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-base font-bold shadow-sm transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 font-semibold text-slate-700 text-sm">Trusted by 500+ Companies</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> 10K+ Candidates
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> 95% Accuracy
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Floating Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] hidden lg:block"
        >
          {/* Main Card */}
          <div className="absolute top-10 right-0 w-[420px] bg-white rounded-2xl shadow-glass border border-white p-6 animate-float z-20">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  AK
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Ahmed Khan</h3>
                  <p className="text-slate-500 text-sm">Senior Full Stack Engineer</p>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-600">
                98
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Problem Solving</span>
                  <span className="text-emerald-600">95%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Technical Skills</span>
                  <span className="text-primary">92%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600">Communication</span>
                  <span className="text-indigo-500">88%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-3">
              <BrainCircuit className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900">AI Recommendation</h4>
                <p className="text-xs text-slate-500 mt-1">Strong architectural patterns. Highly recommended for Senior roles.</p>
              </div>
            </div>
          </div>

          {/* Floating Analytics Card 1 */}
          <div className="absolute top-[350px] right-[300px] w-48 bg-white rounded-xl shadow-floating border border-white/50 p-4 animate-float-delayed z-30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-slate-600">Hiring Success</span>
            </div>
            <div className="text-2xl font-black text-slate-900">+32%</div>
          </div>

          {/* Floating Analytics Card 2 */}
          <div className="absolute top-[40px] right-[380px] w-[200px] bg-white rounded-xl shadow-floating border border-white/50 p-4 animate-float z-10">
            <div className="text-xs font-bold text-slate-500 mb-1">Candidate Match</div>
            <div className="text-3xl font-black text-primary mb-2">91%</div>
            <div className="flex gap-1">
              {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= 6 ? 'bg-primary' : 'bg-slate-100'}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
