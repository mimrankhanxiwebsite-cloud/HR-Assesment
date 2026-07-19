import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Code, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CandidateDashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    completedAssessments: 0,
    averageScore: 0,
    certifications: 0,
  })

  useEffect(() => {
    // In a real app, we'd fetch this from Supabase views or queries
    // Mocking for now to show layout
    setStats({
      completedAssessments: 3,
      averageScore: 85,
      certifications: 1
    })
  }, [user])

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-950">Welcome back, {user?.name || 'Candidate'}!</h1>
        <p className="text-muted-foreground mt-2">Here's a summary of your technical assessment progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assessments</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.completedAssessments}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime total</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Code className="h-4 w-4 text-brand-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earned Certifications</CardTitle>
            <Award className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.certifications}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified skills</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Assessments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Recommended for You</h2>
          <Link to="/candidate/assessments">
            <Button variant="ghost" className="text-primary">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">React & TypeScript Advanced</CardTitle>
                  <CardDescription className="mt-1">Prove your expertise in modern frontend development.</CardDescription>
                </div>
                <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2.5 py-0.5 rounded">Senior</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> 60 Mins</div>
                <div className="flex items-center gap-1"><Code className="w-4 h-4"/> Coding Challenge</div>
              </div>
              <Button className="w-full">Start Assessment</Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">System Design Fundamentals</CardTitle>
                  <CardDescription className="mt-1">Architectural patterns and scalability challenges.</CardDescription>
                </div>
                <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2.5 py-0.5 rounded">Mid-Level</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> 90 Mins</div>
                <div className="flex items-center gap-1"><Code className="w-4 h-4"/> Multiple Choice</div>
              </div>
              <Button className="w-full">Start Assessment</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
