import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, Award, BarChart3, Target, Download } from 'lucide-react'

// Performance Analytics & Benchmark Reporting Page
export default function Analytics() {
  const benchmarks = [
    { skill: 'React / Next.js', platform: 76, market: 68, your: 82 },
    { skill: 'Node.js / Express', platform: 71, market: 65, your: 74 },
    { skill: 'System Design', platform: 64, market: 60, your: 58 },
    { skill: 'PostgreSQL / SQL', platform: 72, market: 70, your: 79 },
    { skill: 'TypeScript', platform: 80, market: 72, your: 85 },
  ]

  const topCandidates = [
    { name: 'Ahmed Khan', rank: 1, composite: 98, technical: 99, coding: 97 },
    { name: 'Sarah Jenkins', rank: 2, composite: 96, technical: 94, coding: 98 },
    { name: 'David Chen', rank: 3, composite: 94, technical: 93, coding: 95 },
    { name: 'Elena Rodriguez', rank: 4, composite: 91, technical: 89, coding: 93 },
    { name: 'James Nguyen', rank: 5, composite: 89, technical: 87, coding: 91 },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics & Benchmark Reports</h1>
          <p className="text-slate-400 mt-1">Platform-wide performance data and candidate benchmarking.</p>
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" />
          Export Report (PDF/Excel)
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Avg Composite Score', value: '76.4%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Assessments This Month', value: '1,248', icon: Award, color: 'text-brand-400' },
          { label: 'Pass Rate (≥70%)', value: '68.2%', icon: Target, color: 'text-amber-400' },
          { label: 'Unique Candidates', value: '3,872', icon: Users, color: 'text-violet-400' },
        ].map((s, i) => (
          <Card key={i} className="bg-slate-900 border-slate-800">
            <CardContent className="p-5 flex items-center gap-4">
              <s.icon className={`w-8 h-8 ${s.color} flex-shrink-0`} />
              <div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skill Benchmarking Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            Skill Benchmarking vs Market
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {benchmarks.map((b) => (
              <div key={b.skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-200">{b.skill}</span>
                  <span className="text-slate-400 text-xs">Platform: {b.platform}% | Market: {b.market}% | Your Org: {b.your}%</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-16">Platform</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${b.platform}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-16">Market</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: `${b.market}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-16">Your Org</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${b.your >= b.market ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${b.your}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidate Ranking Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Candidate Ranking Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-800 text-slate-400">
              <tr className="text-left">
                <th className="p-4 font-medium">Rank</th>
                <th className="p-4 font-medium">Candidate</th>
                <th className="p-4 font-medium">Composite</th>
                <th className="p-4 font-medium">Technical</th>
                <th className="p-4 font-medium">Coding</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {topCandidates.map((c) => (
                <tr key={c.name} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      c.rank === 1 ? 'bg-amber-400 text-amber-900' :
                      c.rank === 2 ? 'bg-slate-400 text-slate-900' :
                      c.rank === 3 ? 'bg-orange-700 text-orange-100' :
                      'bg-slate-800 text-slate-300'
                    }`}>#{c.rank}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-white font-bold text-xs">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-100">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-emerald-400 font-bold text-lg">{c.composite}%</td>
                  <td className="p-4 text-blue-400 font-semibold">{c.technical}%</td>
                  <td className="p-4 text-violet-400 font-semibold">{c.coding}%</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 text-xs">
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
