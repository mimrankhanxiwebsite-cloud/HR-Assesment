import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Award, LineChart, Settings, Bell, Search, ChevronDown, CheckCircle2 } from 'lucide-react'

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            An interface your team will <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">love to use.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Manage candidates, create assessments, and review AI-generated insights all from a beautifully designed, lightning-fast dashboard.
          </p>
        </div>

        {/* Dashboard Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-white/10 bg-slate-950 shadow-2xl overflow-hidden shadow-primary/20"
        >
          {/* Mac-style Window Header */}
          <div className="h-12 bg-slate-900/50 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="mx-auto flex items-center gap-2 px-32">
              <div className="h-6 w-full max-w-md bg-slate-800/50 rounded-md border border-white/5 flex items-center px-3">
                <Search className="w-3 h-3 text-slate-500" />
                <span className="text-slate-500 text-xs ml-2">Search candidates, assessments...</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-400" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            </div>
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/10 bg-slate-900/20 p-4 flex flex-col gap-2">
              {[
                { icon: LayoutDashboard, label: 'Overview', active: true },
                { icon: Users, label: 'Candidates', active: false },
                { icon: Award, label: 'Assessments', active: false },
                { icon: LineChart, label: 'Analytics', active: false },
                { icon: Settings, label: 'Settings', active: false },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 bg-slate-950 overflow-hidden relative">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Candidates Pipeline</h3>
                  <p className="text-slate-400 text-sm mt-1">Review top performers from the latest React assessment.</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Invite Candidates
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Total Assessed', value: '1,284', trend: '+12%' },
                  { label: 'Avg. Score', value: '76%', trend: '+4%' },
                  { label: 'Completion Rate', value: '92%', trend: '-1%' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                    <div className="text-slate-400 text-xs mb-2">{stat.label}</div>
                    <div className="flex items-end gap-3">
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className={`text-xs font-medium mb-1 ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stat.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Mockup */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/10 text-xs font-medium text-slate-400">
                  <div className="col-span-2">CANDIDATE</div>
                  <div>ASSESSMENT</div>
                  <div>SCORE</div>
                  <div>STATUS</div>
                </div>
                {[
                  { name: 'Sarah Jenkins', role: 'Frontend Developer', test: 'React Senior', score: 94, status: 'Passed' },
                  { name: 'David Chen', role: 'Full Stack Engineer', test: 'Node.js Advanced', score: 88, status: 'Passed' },
                  { name: 'Elena Rodriguez', role: 'UI Engineer', test: 'React Senior', score: 72, status: 'Review' },
                  { name: 'James Nguyen', role: 'Backend Developer', test: 'Python Data', score: 91, status: 'Passed' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {row.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">{row.name}</div>
                        <div className="text-xs text-slate-500">{row.role}</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300">{row.test}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${row.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{row.score}%</span>
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${row.score >= 90 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${row.score}%` }} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${row.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {row.status === 'Passed' && <CheckCircle2 className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
