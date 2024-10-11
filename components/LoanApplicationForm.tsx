import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Stepper, Step, StepLabel } from "@mui/material";
import useStepperStore from "@/lib/store/useStepper";
import PersonalInfoStep from "./formSteps/PersonalInfoStep";
import PropertyInfoStep from "./formSteps/PropertyInfoStep";
import LoanDetailsStep from "./formSteps/LoanDetailsStep";
import DocumentUploadStep from "./formSteps/DocumentUpload";
import ReviewStep from "./formSteps/ReviewStep";

const formDataSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  titleNumber: z.string().min(1, "Title number is required"),
  propertyDescription: z.string().min(1, "Property description is required"),
  principalAmount: z.number().min(1, "Principal amount is required"),
  principalAmountWords: z
    .string()
    .min(1, "Principal amount in words is required"),
  interestRate: z.number().min(0, "Interest rate must be 0 or greater"),
  repaymentDate: z.date(),
});

type FormData = z.infer<typeof formDataSchema>;

const LoanApplicationForm = () => {
  const { currentStep, steps, nextStep, prevStep } = useStepperStore();
  const [documents, setDocuments] = useState({
    titleDeed: null,
    chargeDocument: null,
    personalInsurance: null,
    powerOfAttorney: null,
    identificationDocument: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });

  const handleDocumentUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    docType: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      setDocuments({ ...documents, [docType]: event.target.files[0] });
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    console.log(documents);
    // Here you would typically send the data to your backend
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep register={register} errors={errors} />;
      case 1:
        return <PropertyInfoStep register={register} errors={errors} />;
      case 2:
        return <LoanDetailsStep register={register} errors={errors} />;
      case 3:
        return (
          <DocumentUploadStep handleDocumentUpload={handleDocumentUpload} />
        );
      case 4:
        return <ReviewStep />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">New Loan Application</h2>
      </CardHeader>
      <CardContent>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {renderStepContent(currentStep)}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit(onSubmit)}>Submit Application</Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoanApplicationForm;
