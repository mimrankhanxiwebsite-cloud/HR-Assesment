import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileSearch, TrendingUp, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function OrgDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-950">Organization Dashboard</h1>
          <p className="text-muted-foreground mt-2">Overview of your technical hiring pipeline and candidate analytics.</p>
        </div>
        <Link to="/org/candidates">
          <Button className="bg-brand-600 hover:bg-brand-700">Search Talent</Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-brand-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground mt-1">+180 this month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments Taken</CardTitle>
            <FileSearch className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4,231</div>
            <p className="text-xs text-muted-foreground mt-1">Platform wide</p>
          </CardContent>
        </Card>

        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Composite Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-violet-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Proficient Average</p>
          </CardContent>
        </Card>

        <Card className="shadow-brand-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <UserCheck className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for interview</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Top Performers */}
        <Card className="shadow-brand-md">
          <CardHeader>
            <CardTitle>Top Ranked Candidates</CardTitle>
            <CardDescription>Highest scoring candidates from recent assessments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sarah Jenkins', role: 'Senior React Developer', score: 96 },
                { name: 'David Chen', role: 'Full Stack Engineer', score: 94 },
                { name: 'Elena Rodriguez', role: 'Backend Python Dev', score: 91 },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.role}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-emerald-600">{c.score}%</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Demand Trends */}
        <Card className="shadow-brand-md">
          <CardHeader>
            <CardTitle>Skill Benchmarking</CardTitle>
            <CardDescription>Most tested skills across the platform this week.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { skill: 'React / Next.js', percent: 85 },
                 { skill: 'PostgreSQL', percent: 72 },
                 { skill: 'Node.js', percent: 68 },
                 { skill: 'System Design', percent: 54 },
               ].map((s, i) => (
                 <div key={i} className="space-y-1">
                   <div className="flex justify-between text-sm">
                     <span className="font-medium">{s.skill}</span>
                     <span className="text-muted-foreground">{s.percent}% Demand</span>
                   </div>
                   <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-brand-500 rounded-full" 
                       style={{ width: `${s.percent}%` }}
                     />
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
