import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Award, CheckCircle, ChevronRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const ASSESSMENT_CATEGORIES = [
  { name: 'Frontend Development', icon: '⚛️', skills: 'React, Vue, CSS, TypeScript' },
  { name: 'Backend Engineering', icon: '⚙️', skills: 'Node.js, Python, Java, Go' },
  { name: 'Data Engineering', icon: '📊', skills: 'SQL, Spark, Kafka, Airflow' },
  { name: 'Cloud & DevOps', icon: '☁️', skills: 'AWS, K8s, Docker, Terraform' },
  { name: 'Machine Learning', icon: '🧠', skills: 'TensorFlow, PyTorch, scikit-learn' },
  { name: 'Cybersecurity', icon: '🔐', skills: 'Pentesting, SOC, SIEM, OWASP' },
  { name: 'System Design', icon: '🏗️', skills: 'Architecture, Scalability, APIs' },
  { name: 'Soft Skills', icon: '🤝', skills: 'Communication, Leadership, Problem Solving' },
]

export default function AssessmentList() {
  const { user } = useAuthStore()
  const [assessments, setAssessments] = useState<any[]>([])
  const [myAttempts, setMyAttempts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      const { data: asmts } = await supabase
        .from('assessments')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      const { data: attempts } = await supabase
        .from('assessment_attempts')
        .select('*, assessments(title)')
        .eq('candidate_id', user?.id || '')
        .order('started_at', { ascending: false })

      setAssessments(asmts || [])
      setMyAttempts(attempts || [])
      setIsLoading(false)
    }
    loadData()
  }, [user])

  const filtered = activeCategory
    ? assessments.filter(a => a.category === activeCategory)
    : assessments

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-950">Technical Assessments</h1>
        <p className="text-muted-foreground mt-2">Choose a category and start proving your skills.</p>
      </div>

      {/* My Recent Attempts */}
      {myAttempts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">My Recent Attempts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myAttempts.slice(0, 3).map((a: any) => (
              <Card key={a.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{a.assessments?.title || 'Assessment'}</div>
                    <div className="text-xs text-muted-foreground mt-1 capitalize">{a.status}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.status === 'completed' && (
                      <span className="text-lg font-bold text-emerald-600">{a.score_composite || '--'}%</span>
                    )}
                    <Link to={`/candidate/results/${a.id}`}>
                      <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <div>
        <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ASSESSMENT_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
                activeCategory === cat.name
                  ? 'border-brand-600 bg-brand-50 shadow-sm'
                  : 'border-border bg-card hover:border-brand-300'
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-sm">{cat.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{cat.skills}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Assessment Listing */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          {activeCategory ? `${activeCategory} Assessments` : 'All Available Assessments'}
        </h2>

        {/* Demo cards when no live data */}
        {(isLoading || filtered.length === 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'React & TypeScript Advanced', difficulty: 'Senior', duration: 90, points: 500, category: 'Frontend Development' },
              { title: 'Node.js & REST API Design', difficulty: 'Mid-Level', duration: 60, points: 350, category: 'Backend Engineering' },
              { title: 'PostgreSQL & Query Optimization', difficulty: 'Senior', duration: 75, points: 450, category: 'Data Engineering' },
              { title: 'AWS Solutions Architect', difficulty: 'Advanced', duration: 120, points: 600, category: 'Cloud & DevOps' },
            ].filter(a => !activeCategory || a.category === activeCategory).map((a, i) => (
              <Card key={i} className="group hover:shadow-brand-md transition-all border hover:border-brand-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-brand-700 transition-colors">{a.title}</CardTitle>
                      <CardDescription className="mt-1">{a.category}</CardDescription>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      a.difficulty === 'Senior' ? 'bg-brand-100 text-brand-700' :
                      a.difficulty === 'Advanced' ? 'bg-violet-100 text-violet-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {a.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {a.duration} min</span>
                    <span className="flex items-center gap-1"><Award className="w-4 h-4 text-amber-500" /> {a.points} pts</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Mixed Format</span>
                  </div>
                  <Button className="w-full group-hover:bg-brand-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Live data */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((a) => (
              <Card key={a.id} className="group hover:shadow-brand-md transition-all border hover:border-brand-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-brand-700 transition-colors">{a.title}</CardTitle>
                      <CardDescription className="mt-1">{a.category}</CardDescription>
                    </div>
                    <span className="bg-brand-100 text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                      {a.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {a.duration_minutes} min</span>
                    <span className="flex items-center gap-1"><Award className="w-4 h-4 text-amber-500" /> {a.total_score} pts</span>
                  </div>
                  <Link to={`/assessment/${a.id}/lobby`}>
                    <Button className="w-full">Start Assessment</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
