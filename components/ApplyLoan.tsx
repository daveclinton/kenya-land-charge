"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Home,
  FileText,
  ClipboardList,
  CheckCircle,
  Check,
} from "lucide-react";
import { useFormStore } from "@/lib/store/useFormStore";

type FormData = {
  amount: number;
  repaymentPeriod: number;
  titleDeedNumber: string;
  propertyAddress: string;
  identificationDocument: FileList | null;
  powerOfAttorney: FileList | null;
  titleDeed: FileList | null;
};

interface ApplyLoanFormProps {
  userId: number | undefined;
}

export default function ApplyLoanForm({ userId }: ApplyLoanFormProps) {
  const {
    step,
    isOpen,
    formData,
    isSubmitted,
    setStep,
    setIsOpen,
    updateFormData,
    setIsSubmitted,
    resetForm,
  } = useFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("userId", userId?.toString() || "");
    formData.append("amount", data.amount.toString());
    formData.append("repaymentPeriod", data.repaymentPeriod.toString());
    formData.append("titleDeedNumber", data.titleDeedNumber);
    formData.append("propertyAddress", data.propertyAddress);
    if (data.identificationDocument)
      formData.append("identificationDocument", data.identificationDocument[0]);
    if (data.powerOfAttorney)
      formData.append("powerOfAttorney", data.powerOfAttorney[0]);
    if (data.titleDeed) formData.append("titleDeed", data.titleDeed[0]);

    try {
      const response = await fetch("/api/submit-loan", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setStep(5);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  const nextStep = () => {
    handleSubmit((data) => {
      updateFormData(data);
      if (step < 4) {
        setStep(step + 1);
      } else {
        onSubmit(data);
      }
    })();
  };

  const prevStep = () => setStep(step - 1);

  const closeAndReset = () => {
    setIsOpen(false);
    resetForm();
  };

  const steps = [
    { icon: CreditCard, title: "Loan Details" },
    { icon: Home, title: "Property Details" },
    { icon: FileText, title: "Documents" },
    { icon: ClipboardList, title: "Review" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Apply for Loan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-sky-700">
            Loan Application
          </DialogTitle>
          <DialogDescription className="text-sky-600">
            Please fill out the following information to apply for a loan.
          </DialogDescription>
        </DialogHeader>
        {!isSubmitted && (
          <div className="flex justify-between mb-6">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`rounded-full p-2 ${
                    step > index + 1
                      ? "bg-sky-500 text-white"
                      : "bg-sky-100 text-sky-500"
                  }`}
                >
                  {step > index + 1 ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <s.icon className="h-6 w-6" />
                  )}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    step > index ? "text-sky-500 font-semibold" : "text-sky-400"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-sky-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-sky-700">
                {isSubmitted ? "Application Submitted" : steps[step - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount" className="text-sky-600">
                      Loan Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      {...register("amount", {
                        required: "Amount is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.amount && (
                      <span className="text-red-500 text-sm">
                        {errors.amount.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="repaymentPeriod" className="text-sky-600">
                      Repayment Period (months)
                    </Label>
                    <Input
                      id="repaymentPeriod"
                      type="number"
                      {...register("repaymentPeriod", {
                        required: "Repayment period is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.repaymentPeriod && (
                      <span className="text-red-500 text-sm">
                        {errors.repaymentPeriod.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titleDeedNumber" className="text-sky-600">
                      Title Deed Number
                    </Label>
                    <Input
                      id="titleDeedNumber"
                      {...register("titleDeedNumber", {
                        required: "Title deed number is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.titleDeedNumber && (
                      <span className="text-red-500 text-sm">
                        {errors.titleDeedNumber.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="propertyAddress" className="text-sky-600">
                      Property Address
                    </Label>
                    <Input
                      id="propertyAddress"
                      {...register("propertyAddress", {
                        required: "Property address is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.propertyAddress && (
                      <span className="text-red-500 text-sm">
                        {errors.propertyAddress.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="identificationDocument"
                      className="text-sky-600"
                    >
                      Identification Document
                    </Label>
                    <Input
                      id="identificationDocument"
                      type="file"
                      {...register("identificationDocument", {
                        required: "Identification document is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.identificationDocument && (
                      <span className="text-red-500 text-sm">
                        {errors.identificationDocument.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="powerOfAttorney" className="text-sky-600">
                      Power of Attorney
                    </Label>
                    <Input
                      id="powerOfAttorney"
                      type="file"
                      {...register("powerOfAttorney", {
                        required: "Power of attorney is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.powerOfAttorney && (
                      <span className="text-red-500 text-sm">
                        {errors.powerOfAttorney.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="titleDeed" className="text-sky-600">
                      Title Deed
                    </Label>
                    <Input
                      id="titleDeed"
                      type="file"
                      {...register("titleDeed", {
                        required: "Title deed is required",
                      })}
                      className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                    />
                    {errors.titleDeed && (
                      <span className="text-red-500 text-sm">
                        {errors.titleDeed.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-sky-700">
                    Review Your Information
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-sky-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sky-700">
                        Loan Details
                      </h4>
                      <p className="text-sky-600">
                        Loan Amount: ${formData.amount}
                      </p>
                      <p className="text-sky-600">
                        Repayment Period: {formData.repaymentPeriod} months
                      </p>
                    </div>
                    <div className="bg-sky-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sky-700">
                        Property Details
                      </h4>
                      <p className="text-sky-600">
                        Title Deed Number: {formData.titleDeedNumber}
                      </p>
                      <p className="text-sky-600">
                        Property Address: {formData.propertyAddress}
                      </p>
                    </div>
                    <div className="bg-sky-50 p-3 rounded-md">
                      <h4 className="font-semibold text-sky-700">
                        Uploaded Documents
                      </h4>
                      <p className="text-sky-600">
                        Identification Document:{" "}
                        {formData.identificationDocument?.[0]?.name ||
                          "Not uploaded"}
                      </p>
                      <p className="text-sky-600">
                        Power of Attorney:{" "}
                        {formData.powerOfAttorney?.[0]?.name || "Not uploaded"}
                      </p>
                      <p className="text-sky-600">
                        Title Deed:{" "}
                        {formData.titleDeed?.[0]?.name || "Not uploaded"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {isSubmitted && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <p className="text-xl font-semibold text-sky-700">
                    Application Submitted Successfully!
                  </p>
                  <p className="text-sky-600">
                    Thank you for your application. We will review it and get
                    back to you soon.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!isSubmitted && (
                <>
                  {step > 1 && (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-sky-500 text-sky-700 hover:bg-sky-50"
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    {step < 4 ? "Next" : "Submit Application"}
                  </Button>
                </>
              )}
              {isSubmitted && (
                <Button
                  type="button"
                  onClick={closeAndReset}
                  className="bg-sky-500 hover:bg-sky-600 text-white mx-auto"
                >
                  Close
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
