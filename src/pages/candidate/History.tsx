import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const MOCK_HISTORY = [
  { id: '1', title: 'React & TypeScript Advanced', status: 'completed', score: 92, date: '2026-06-15', duration: 47 },
  { id: '2', title: 'Node.js & REST APIs', status: 'completed', score: 88, date: '2026-04-10', duration: 55 },
  { id: '3', title: 'System Design Fundamentals', status: 'in_progress', score: null, date: '2026-07-10', duration: null },
  { id: '4', title: 'AWS Cloud Practitioner', status: 'completed', score: 74, date: '2026-03-01', duration: 60 },
]

export default function History() {
  const { user } = useAuthStore()
  const [history, setHistory] = useState(MOCK_HISTORY)

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-950">Assessment History</h1>
        <p className="text-muted-foreground mt-2">All your past and ongoing assessments.</p>
      </div>

      <Card className="shadow-brand-sm">
        <CardContent className="p-0">
          <div className="divide-y">
            {history.map((attempt) => (
              <div key={attempt.id} className="flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
                <div className="w-10">
                  {attempt.status === 'completed'
                    ? <CheckCircle className="w-6 h-6 text-emerald-500" />
                    : <AlertCircle className="w-6 h-6 text-amber-500" />
                  }
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{attempt.title}</div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>{attempt.date}</span>
                    {attempt.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {attempt.duration} min
                      </span>
                    )}
                    <span className="capitalize font-medium">{attempt.status.replace('_', ' ')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {attempt.score !== null && (
                    <div className={`text-2xl font-bold ${attempt.score >= 80 ? 'text-emerald-600' : attempt.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                      {attempt.score}%
                    </div>
                  )}
                  <Link to={`/candidate/results/${attempt.id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
