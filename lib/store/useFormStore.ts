import { create } from "zustand";

export type FormData = {
  amount: number;
  repaymentPeriod: number;
  titleDeedNumber: string;
  propertyAddress: string;
  identificationDocument: FileList | null;
  powerOfAttorney: FileList | null;
  titleDeed: FileList | null;
};

type FormStore = {
  step: number;
  isOpen: boolean;
  formData: Partial<FormData>;
  isSubmitted: boolean;
  setStep: (step: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  updateFormData: (data: Partial<FormData>) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
  resetForm: () => void;
};

export const useFormStore = create<FormStore>((set) => ({
  step: 1,
  isOpen: false,
  formData: {},
  isSubmitted: false,
  setStep: (step) => set({ step }),
  setIsOpen: (isOpen) => set({ isOpen }),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
  resetForm: () => set({ step: 1, formData: {}, isSubmitted: false }),
}));
