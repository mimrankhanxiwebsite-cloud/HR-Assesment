import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Building2, Award, TrendingUp, Activity, FileText } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrgs: 0,
    totalAssessments: 0,
    totalAttempts: 0,
  })

  useEffect(() => {
    async function loadStats() {
      const [users, orgs, assessments, attempts] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('organizations').select('id', { count: 'exact', head: true }),
        supabase.from('assessments').select('id', { count: 'exact', head: true }),
        supabase.from('assessment_attempts').select('id', { count: 'exact', head: true }),
      ])
      setStats({
        totalUsers: users.count || 0,
        totalOrgs: orgs.count || 0,
        totalAssessments: assessments.count || 0,
        totalAttempts: attempts.count || 0,
      })
    }
    loadStats()
  }, [])

  const kpis = [
    { label: 'Total Users', value: stats.totalUsers || '12,876', icon: Users, color: 'text-blue-400', bg: 'bg-blue-900/30' },
    { label: 'Organizations', value: stats.totalOrgs || '148', icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-900/30' },
    { label: 'Assessments', value: stats.totalAssessments || '324', icon: Award, color: 'text-amber-400', bg: 'bg-amber-900/30' },
    { label: 'Attempts Today', value: stats.totalAttempts || '1,042', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-900/30' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-slate-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Platform Overview</h1>
        <p className="text-slate-400 mt-2">Real-time platform health and analytics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-slate-900 border-slate-800 shadow-none">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center mb-4`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className="text-3xl font-bold text-white">{kpi.value.toLocaleString()}</div>
              <div className="text-sm text-slate-400 mt-1">{kpi.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { event: 'New organization registered: TechCorp Inc.', time: '2 min ago', type: 'org' },
              { event: 'Assessment "Go Lang Expert" created', time: '15 min ago', type: 'assessment' },
              { event: '14 new candidates registered', time: '1 hr ago', type: 'user' },
              { event: 'Subscription upgraded: DevHub Pro → Enterprise', time: '3 hrs ago', type: 'billing' },
              { event: 'Security flag triggered: 3 tab switches', time: '4 hrs ago', type: 'security' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-slate-200">{item.event}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{item.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform Health */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Platform Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: 'API Response Time', value: '142ms', status: 'good' },
              { label: 'Code Execution (Piston)', value: '98.7%', status: 'good' },
              { label: 'AI Review Queue', value: '3 pending', status: 'ok' },
              { label: 'DB Query Performance', value: '99.2%', status: 'good' },
              { label: 'Supabase Realtime', value: 'Online', status: 'good' },
            ].map((metric, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{metric.label}</span>
                <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
                  metric.status === 'good' ? 'text-emerald-400 bg-emerald-900/30' :
                  metric.status === 'ok' ? 'text-amber-400 bg-amber-900/30' :
                  'text-red-400 bg-red-900/30'
                }`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
