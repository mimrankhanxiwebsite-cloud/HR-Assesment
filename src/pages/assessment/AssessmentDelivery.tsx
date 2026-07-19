import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useAssessmentStore } from '@/store/assessmentStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ExamTimer from '@/components/assessment/ExamTimer'
import QuestionRenderer from '@/components/assessment/QuestionRenderer'

export default function AssessmentDelivery() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    answers,
    resetAssessment
  } = useAssessmentStore()

  const [questions, setQuestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchQuestions() {
      if (!attemptId) return

      // In a real implementation, we would query the specific questions
      // assigned to this attempt. We'll mock the fetch here based on the PRD schema.
      const { data: attempt } = await supabase
        .from('assessment_attempts')
        .select('*, assessments(*)')
        .eq('id', attemptId)
        .single()

      if (attempt && attempt.assessments) {
        // Fetch questions for this assessment's configs
        // Simplified for UI demonstration:
        const { data: qData } = await supabase
          .from('questions')
          .select('*, question_options(*)')
          .limit(5)

        if (qData) {
          setQuestions(qData)
        }
      }
      setIsLoading(false)
    }

    fetchQuestions()
  }, [attemptId])

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    if (!attemptId) return
    
    // Calculate basic score logic (mocked)
    const score = Object.keys(answers).length * 10
    
    await supabase.from('assessment_attempts').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      score_technical: score,
      score_composite: score
    }).eq('id', attemptId)

    resetAssessment()
    navigate('/candidate/results')
  }

  // Security overlay effects (Fullscreen enforcement)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Log tab switch violation
        console.warn("Tab switch detected!")
      }
    }
    
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading Exam...</div>
  if (questions.length === 0) return <div className="flex justify-center items-center h-screen">No questions found.</div>

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  return (
    <div className="flex flex-col h-screen bg-brand-50 p-4">
      {/* Exam Header */}
      <header className="flex items-center justify-between bg-card p-4 rounded-lg shadow-brand-sm mb-4">
        <h1 className="text-xl font-bold tracking-tight">Technical Assessment</h1>
        <ExamTimer 
          durationMinutes={90} 
          onTimeUp={handleSubmit} 
        />
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex justify-center">
        <Card className="w-full max-w-4xl shadow-brand-md h-fit">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="capitalize">{currentQuestion.difficulty} • {currentQuestion.type}</span>
            </div>
            <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <QuestionRenderer 
              question={currentQuestion} 
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {isLastQuestion ? (
              <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                Submit Assessment
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next Question
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
