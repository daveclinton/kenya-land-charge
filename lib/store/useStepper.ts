import { create } from "zustand";
import {
  User,
  UserIcon,
  HomeIcon,
  CircleDollarSign,
  FileIcon,
  ClipboardCheckIcon,
} from "lucide-react";

interface Step {
  title: string;
  icon: typeof User;
}

interface StepperState {
  currentStep: number;
  steps: Step[];
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const useStepperStore = create<StepperState>((set) => ({
  currentStep: 0,
  steps: [
    { title: "Personal Info", icon: UserIcon },
    { title: "Property", icon: HomeIcon },
    { title: "Loan Details", icon: CircleDollarSign },
    { title: "Documents", icon: FileIcon },
    { title: "Review", icon: ClipboardCheckIcon },
  ],
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.steps.length),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
}));

export default useStepperStore;
