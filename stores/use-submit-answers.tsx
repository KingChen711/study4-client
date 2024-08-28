// import { create } from "zustand"

// interface SubmitAnswersState {
//   answers: Record<number, string>
//   changeAnswer: ({
//     questionId,
//     answer,
//   }: {
//     questionId: number
//     answer: string
//   }) => void
// }

// export const useSubmitAnswers = create<SubmitAnswersState>()((set) => ({
//   answers: [],
//   changeAnswer: () => {
//     set((state) => ({ answers: [...state.answers] }))
//   },
// }))
