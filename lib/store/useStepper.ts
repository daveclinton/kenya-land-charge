import { create } from "zustand";
// import { User, Home, FileText, Upload, ClipboardCheck } from "lucide-react";

interface Step {
  title: string;
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
    { title: "Personal Information" },
    { title: "Property Details" },
    { title: "Loan Terms" },
    { title: "Document Upload" },
    { title: "Review and Submit" },
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
