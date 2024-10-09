"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SuccessPage from "@/components/success";
import emailjs from "@emailjs/browser";
import Stepper from "./_components/Stepper";
import Step1Form from "./_components/Step1Form";
import Step2Form from "./_components/Step2Form";
import Step3Form from "./_components/Step3Form";
import { format } from "date-fns";

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

  const isDocumentKey = (key: string): key is DocumentKeys => {
    return [
      "titleDeed",
      "chargeDocument",
      "personalInsurance",
      "powerOfAttorney",
      "identificationDocument",
    ].includes(key);
  };

  const onSubmit = async (data: FormSchema) => {
    if (step !== 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      console.log("Form data:", data);
      console.log("Documents:", documents);
      const emailData = {
        to_email: data.email,
        from_name: "Kiathagana Financial Management LLC",
        to_name: data.fullName,
        full_name: data.fullName,
        email: data.email,
        address: data.address,
        title_number: data.titleNumber,
        property_description: data.propertyDescription,
        principal_amount: data.principalAmount,
        principal_amount_words: data.principalAmountWords,
        interest_rate: data.interestRate,
        repayment_date: format(data.repaymentDate, "PPP"),
        documents_uploaded: Object.keys(documents)
          .filter((key) => documents[key as DocumentKeys] !== null)
          .join(", "),
      };

      // Email sending logic...
      try {
        const result = await emailjs.send(
          "service_eaj3nlu",
          "template_tdhkyp8",
          emailData,
          "46krzg3JxLFOt5LBi"
        );

        console.log("Email sent successfully:", result.text);
        setIsSubmissionSuccessful(true);
      } catch (error) {
        console.error("Failed to send email", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = () => {
    form.trigger([
      "fullName",
      "email",
      "address",
      "titleNumber",
      "propertyDescription",
    ]);
    const { fullName, email, address, titleNumber, propertyDescription } =
      form.getValues();
    if (fullName && email && address && titleNumber && propertyDescription) {
      setStep(2);
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
            {step === 2 && <Step2Form form={form} isLoading={isLoading} />}
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
