import { create } from "zustand"

interface ActiveSectionState {
  activeSection: string
  setActiveSection: (value: string) => void
}

export const useActiveSection = create<ActiveSectionState>()((set) => ({
  activeSection: "",
  setActiveSection: (value: string) =>
    set(() => ({
      activeSection: value,
    })),
}))
