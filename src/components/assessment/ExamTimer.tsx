import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamTimerProps {
  durationMinutes: number
  onTimeUp: () => void
}

export default function ExamTimer({ durationMinutes, onTimeUp }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft, onTimeUp])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const isLowTime = timeLeft < 300 // Less than 5 minutes

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-md font-mono text-lg font-bold shadow-sm transition-colors",
      isLowTime ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-muted text-foreground"
    )}>
      <Clock className="w-5 h-5" />
      {formatTime(timeLeft)}
    </div>
  )
}
