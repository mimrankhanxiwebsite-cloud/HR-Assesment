import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Code, BookOpen, Brain, Download, Share2, CheckCircle, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

// Circular Progress Component
function CircularScore({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 54
  const circ = 2 * Math.PI * radius
  const offset = circ - (score / 100) * circ
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={radius}
          fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
        <text x="70" y="70" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-2xl font-bold" style={{ fontSize: 28, fontWeight: 700 }}>
          {score}
        </text>
      </svg>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

export default function AssessmentResults() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const [attempt, setAttempt] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      if (!attemptId) return
      // In production: query assessment_attempts joined with candidates and assessments
      // Mocking data for full UI demonstration
      setAttempt({
        id: attemptId,
        assessmentTitle: 'React & TypeScript Advanced',
        completedAt: new Date().toISOString(),
        durationTaken: 47,
        scores: {
          technical: 88,
          coding: 92,
          aiReview: 85,
          composite: 89,
        },
        rank: 3,
        totalCandidates: 214,
        badge: 'Senior Level Certified',
        breakdown: [
          { label: 'React Hooks & Patterns', score: 95, max: 100, pass: true },
          { label: 'TypeScript Generics', score: 90, max: 100, pass: true },
          { label: 'State Management', score: 85, max: 100, pass: true },
          { label: 'Performance Optimization', score: 72, max: 100, pass: true },
          { label: 'Testing Patterns', score: 60, max: 100, pass: false },
        ],
        aiReviewSummary: 'Code demonstrates strong architectural patterns, good use of hooks, and clean separation of concerns. Minor improvements suggested in error boundary implementation and memoization strategy. Overall code quality is high with excellent readability.',
      })
      setIsLoading(false)
    }
    fetchResults()
  }, [attemptId])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading Results...</div>
  if (!attempt) return <div className="text-center p-8">No results found.</div>

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'
    if (score >= 70) return '#3b82f6'
    if (score >= 50) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

        {/* Header Banner */}
        <Card className="shadow-brand-lg border-t-4 border-t-emerald-500 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-brand-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-amber-300" />
                  <span className="text-amber-300 font-semibold text-lg">{attempt.badge}</span>
                </div>
                <h1 className="text-3xl font-bold">{attempt.assessmentTitle}</h1>
                <p className="text-emerald-100 mt-1">
                  Completed in {attempt.durationTaken} minutes • 
                  Ranked <span className="text-white font-bold">#{attempt.rank}</span> of {attempt.totalCandidates} candidates
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button className="bg-amber-400 text-amber-900 hover:bg-amber-300 font-bold">
                  <Download className="w-4 h-4 mr-2" /> Download Certificate
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Score Breakdown */}
        <Card className="shadow-brand-md">
          <CardHeader>
            <CardTitle className="text-xl">Composite Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-around gap-6 py-4">
              <CircularScore score={attempt.scores.composite} label="Composite Score" color="#6366f1" />
              <CircularScore score={attempt.scores.technical} label="Technical Knowledge" color="#3b82f6" />
              <CircularScore score={attempt.scores.coding} label="Coding Ability" color="#10b981" />
              <CircularScore score={attempt.scores.aiReview} label="AI Code Quality" color="#8b5cf6" />
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground">
              <span className="font-medium">Formula: </span>Technical (40%) + Coding (40%) + AI Review (20%)
            </div>
          </CardContent>
        </Card>

        {/* Section Score Cards */}
        <Card className="shadow-brand-md">
          <CardHeader>
            <CardTitle className="text-xl">Section-by-Section Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {attempt.breakdown.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-8">
                  {item.pass 
                    ? <CheckCircle className="w-6 h-6 text-emerald-500" />
                    : <XCircle className="w-6 h-6 text-red-400" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{item.label}</span>
                    <span className={item.pass ? 'text-emerald-600' : 'text-red-500'}>{item.score}/{item.max}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${item.score}%`, backgroundColor: getScoreColor(item.score) }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Code Review */}
        <Card className="shadow-brand-md border-l-4 border-l-violet-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Brain className="w-5 h-5 text-violet-600" />
              AI Code Review Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground/80 leading-relaxed">{attempt.aiReviewSummary}</p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4 pb-8">
          <Link to="/candidate/dashboard">
            <Button variant="outline" size="lg">Back to Dashboard</Button>
          </Link>
          <Link to="/candidate/assessments">
            <Button size="lg">Take Another Assessment</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
