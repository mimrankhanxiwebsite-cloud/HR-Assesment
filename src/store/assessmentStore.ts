import { create } from 'zustand'

interface AssessmentState {
  activeAssessmentId: string | null
  currentQuestionIndex: number
  answers: Record<string, any>
  timeRemaining: number | null
  setActiveAssessment: (id: string | null) => void
  setCurrentQuestionIndex: (index: number) => void
  setAnswer: (questionId: string, answer: any) => void
  setTimeRemaining: (time: number | null) => void
  resetAssessment: () => void
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  activeAssessmentId: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: null,
  setActiveAssessment: (id) => set({ activeAssessmentId: id }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  resetAssessment: () =>
    set({
      activeAssessmentId: null,
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: null,
    }),
}))
