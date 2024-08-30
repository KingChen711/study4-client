import { create } from "zustand"

export type Answer = {
  questionId: number
  questionNumber: number
  sectionName: string
  selectedAnswer: string
}

interface SubmitAnswersState {
  answers: Record<string, Answer>
  initAnswer: (answers: Answer[]) => void
  patchAnswer: (answer: { questionId: number; value: string }) => void
  getAnswersEachSection: () => Record<string, Answer[]>
}

export const useSubmitAnswers = create<SubmitAnswersState>()((set, get) => ({
  answers: {},
  initAnswer: (input: Answer[]) => {
    const answers: Record<string, Answer> = {}

    input.forEach((i) => (answers[i.questionId] = i))

    set(() => ({ answers }))
  },
  patchAnswer: ({ questionId, value }: { questionId: number; value: string }) =>
    set((state) => {
      if (state.answers[questionId]) {
        return {
          ...state,
          answers: {
            ...state.answers,
            [questionId]: {
              ...state.answers[questionId],
              selectedAnswer: value,
            },
          },
        }
      }

      return state
    }),
  getAnswersEachSection: () => {
    const res: Record<string, Answer[]> = {}

    Object.values(get().answers).forEach((answer) => {
      res[answer.sectionName] = res[answer.sectionName]
        ? [...res[answer.sectionName], answer]
        : [answer]
    })

    return res
  },
}))
