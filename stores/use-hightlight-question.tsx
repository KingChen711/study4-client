import { create } from "zustand"

type HighlightInput = {
  sectionName: string
  questionId: number
  sectionId: number
}

interface HighlightQuestionState {
  highlightedQuestion: HighlightInput | null
  highlightQuestion: (_: HighlightInput) => void
}

export const useHighlightQuestion = create<HighlightQuestionState>()((set) => ({
  highlightedQuestion: null,
  highlightQuestion: (input: HighlightInput) => {
    set(() => ({ highlightedQuestion: input }))
    setTimeout(() => set(() => ({ highlightedQuestion: null })), 2000)
  },
}))
