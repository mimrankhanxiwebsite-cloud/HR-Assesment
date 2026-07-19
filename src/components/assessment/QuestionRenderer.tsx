import { useAssessmentStore } from '@/store/assessmentStore'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import CodeEditor from '@/components/assessment/CodeEditor'

interface QuestionRendererProps {
  question: any
}

export default function QuestionRenderer({ question }: QuestionRendererProps) {
  const { answers, setAnswer } = useAssessmentStore()

  const currentAnswer = answers[question.id]

  if (!question) return null

  switch (question.type) {
    case 'mcq':
    case 'true_false':
      return (
        <div className="space-y-4">
          <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
            {question.description}
          </p>
          <div className="space-y-2 mt-6">
            {question.question_options?.map((option: any) => (
              <label 
                key={option.id}
                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  currentAnswer === option.id 
                    ? 'border-primary bg-primary/5 shadow-sm' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={currentAnswer === option.id}
                  onChange={() => setAnswer(question.id, option.id)}
                  className="mt-1"
                />
                <span className="text-sm font-medium leading-tight">{option.content}</span>
              </label>
            ))}
          </div>
        </div>
      )
    
    case 'fill_blank':
      return (
        <div className="space-y-4">
          <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
            {question.description}
          </p>
          <div className="mt-6">
            <Label htmlFor={`fill-${question.id}`}>Your Answer</Label>
            <Input 
              id={`fill-${question.id}`}
              value={currentAnswer || ''}
              onChange={(e) => setAnswer(question.id, e.target.value)}
              placeholder="Type your answer here..."
              className="mt-2"
            />
          </div>
        </div>
      )

    case 'coding':
      return (
        <div className="space-y-4 h-[600px] flex flex-col">
          <div className="flex-none">
            <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
              {question.description}
            </p>
          </div>
          <div className="flex-1 mt-4 border rounded-md overflow-hidden flex flex-col">
            <CodeEditor 
              questionId={question.id}
              initialCode={currentAnswer || "// Write your code here\n"}
            />
          </div>
        </div>
      )

    default:
      return <div>Unsupported question type</div>
  }
}
