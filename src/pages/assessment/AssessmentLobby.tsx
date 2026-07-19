import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useAssessmentStore } from '@/store/assessmentStore'
import { AlertTriangle, Clock, ShieldAlert, Monitor, CheckCircle } from 'lucide-react'

export default function AssessmentLobby() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { setActiveAssessment, resetAssessment } = useAssessmentStore()
  
  const [assessment, setAssessment] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  useEffect(() => {
    async function fetchAssessment() {
      if (!id) return
      
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) {
        setAssessment(data)
      }
      setIsLoading(false)
    }

    fetchAssessment()
    // Reset any previous assessment state
    resetAssessment()
  }, [id, resetAssessment])

  const handleStart = async () => {
    if (!user || !assessment) return

    // Create an attempt record
    const { data: attempt, error } = await supabase
      .from('assessment_attempts')
      .insert({
        assessment_id: assessment.id,
        candidate_id: user.id,
        status: 'in_progress',
        security_flags: { tab_switches: 0 }
      })
      .select()
      .single()

    if (!error && attempt) {
      setActiveAssessment(attempt.id)
      navigate(`/assessment/${attempt.id}/delivery`)
    } else {
      alert("Failed to start assessment. Please try again.")
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!assessment) {
    return <div className="flex justify-center items-center h-screen">Assessment not found.</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
      <Card className="w-full max-w-2xl shadow-brand-lg border-t-4 border-t-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">{assessment.title}</CardTitle>
          <CardDescription className="text-base mt-2">{assessment.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-8 py-4 border-y">
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-brand-600 mb-2" />
              <span className="font-semibold">{assessment.duration_minutes} Minutes</span>
              <span className="text-xs text-muted-foreground">Time Limit</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="font-semibold">{assessment.total_score} Points</span>
              <span className="text-xs text-muted-foreground">Total Score</span>
            </div>
            <div className="flex flex-col items-center">
              <Monitor className="w-8 h-8 text-violet-600 mb-2" />
              <span className="font-semibold capitalize">{assessment.difficulty}</span>
              <span className="text-xs text-muted-foreground">Difficulty Level</span>
            </div>
          </div>

          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-destructive-foreground">
            <h3 className="flex items-center gap-2 font-semibold text-destructive mb-2">
              <ShieldAlert className="w-5 h-5" />
              Strict Proctoring Rules Apply
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1 text-destructive/90">
              <li>You must complete this assessment in one sitting.</li>
              <li>Switching tabs or navigating away from the window is strictly prohibited and will be logged.</li>
              <li>Copy-pasting code from external sources is disabled and monitored.</li>
              <li>The exam will automatically submit when the timer runs out.</li>
            </ul>
          </div>

          <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <input 
              type="checkbox" 
              className="mt-1"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span className="text-sm">
              I have read and agree to the proctoring rules. I understand that violating these rules may result in immediate termination of the assessment and a score of 0.
            </span>
          </label>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full text-lg h-12" 
            size="lg" 
            disabled={!agreedToTerms}
            onClick={handleStart}
          >
            Start Assessment Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
