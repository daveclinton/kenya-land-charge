"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SuccessPage from "@/components/success";
import Stepper from "./_components/Stepper";
import Step1Form from "./_components/Step1Form";
import Step2Form from "./_components/Step2Form";
import Step3Form from "./_components/Step3Form";
import { format } from "date-fns";
import { uploadToS3 } from "@/utils/s3";
import { createFormSubmission } from "@/lib/actions/user";

export type FormSchema = z.infer<typeof formSchema>;

type DocumentKeys =
  | "titleDeed"
  | "chargeDocument"
  | "personalInsurance"
  | "powerOfAttorney"
  | "identificationDocument";

export default function MyFormPage() {
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState({
    titleDeed: null,
    chargeDocument: null,
    personalInsurance: null,
    powerOfAttorney: null,
    identificationDocument: null,
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0 && isDocumentKey(name)) {
      setDocuments((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (data: FormSchema) => {
    console.log("Here", data);
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    try {
      // Handle file uploads
      const documentUrls: Partial<Record<DocumentKeys, string>> = {};
      for (const [key, file] of Object.entries(documents)) {
        if (file && isDocumentKey(key)) {
          const url = await uploadToS3(
            file,
            `${data.fullName}/${key}-${Date.now()}`
          );
          documentUrls[key] = url;
        }
      }

      // Call server action to save form submission
      const submissionResult = await createFormSubmission(data, documentUrls);

      if (!submissionResult.success) {
        throw new Error(
          submissionResult.error || "Failed to save form submission"
        );
      }

      // Prepare and send confirmation email
      const emailData = {
        to: data.email,
        from: "no-reply@kiathagana.com",
        subject: "Form Submission Confirmation",
        html: `
        <h1>Thank you for your submission, ${data.fullName}!</h1>
        <p>We have received your form with the following details:</p>
        <ul>
          <li>Full Name: ${data.fullName}</li>
          <li>Email: ${data.email}</li>
          <li>Address: ${data.address}</li>
          <li>Title Number: ${data.titleNumber}</li>
          <li>Property Description: ${data.propertyDescription}</li>
          <li>Principal Amount: ${data.principalAmount}</li>
          <li>Principal Amount in Words: ${data.principalAmountWords}</li>
          <li>Interest Rate: ${data.interestRate}%</li>
          <li>Repayment Date: ${format(data.repaymentDate, "PPP")}</li>
          <li>Documents Uploaded: ${Object.keys(documentUrls).join(", ")}</li>
        </ul>
        <p>We will process your submission and get back to you soon.</p>
      `,
      };

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send confirmation email");
      }

      console.log("Form submitted and email sent successfully");
      setIsSubmissionSuccessful(true);
    } catch (error) {
      console.error("Failed to process submission:", error);
      // Add user feedback about the error (e.g., toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to type-check document keys
  const isDocumentKey = (key: string): key is DocumentKeys => {
    return [
      "titleDeed",
      "chargeDocument",
      "personalInsurance",
      "powerOfAttorney",
      "identificationDocument",
    ].includes(key);
  };
  const handleNext = async () => {
    const isValid = await form.trigger();
    console.log("Is Form Valid:", isValid);
    console.log("Current Step:", step);
    if (!isValid) {
      console.log("Validation Errors:", form.formState.errors);
    }

    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  if (isSubmissionSuccessful) {
    return <SuccessPage formData={form.getValues()} />;
  }

  return (
    <div className="min-h-screen mt-20 md:mt-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <Stepper currentStep={step} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && <Step1Form form={form} onNext={handleNext} />}
            {step === 2 && <Step2Form form={form} onNext={handleNext} />}
            {step === 3 && (
              <Step3Form
                handleFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
