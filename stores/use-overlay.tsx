import { create } from "zustand"

interface OverlayState {
  progress: number
  showing: boolean
  show: () => void
  hide: () => void
}

export const useOverlay = create<OverlayState>()((set) => ({
  progress: 15,
  showing: false,
  show: () => {
    set(() => ({ showing: true }))
    setTimeout(() => set(() => ({ progress: 90 })), 50)
  },
  hide: () => {
    set(() => ({ progress: 100 }))
    setTimeout(() => set(() => ({ showing: false, progress: 15 })), 50)
  },
}))
