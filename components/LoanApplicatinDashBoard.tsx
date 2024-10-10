"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Stepper, Step, StepLabel } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from "chart.js";

ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

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

const steps = [
  "Personal Information",
  "Property Details",
  "Loan Terms",
  "Document Upload",
  "Review and Submit",
];

const LoanApplicationDashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDocumentUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    docType: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      setDocuments({ ...documents, [docType]: event.target.files[0] });
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    console.log(documents);
    // Here you would typically send the data to your backend
  };

  // Mock data for visualizations
  const loanHistory = [
    { month: "Jan", amount: 1000 },
    { month: "Feb", amount: 1500 },
    { month: "Mar", amount: 1200 },
    { month: "Apr", amount: 1800 },
    { month: "May", amount: 2000 },
    { month: "Jun", amount: 1700 },
  ];

  const creditScoreData = {
    labels: ["Excellent", "Good", "Fair", "Poor"],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ["#4CAF50", "#8BC34A", "#FFC107", "#FF5722"],
        hoverBackgroundColor: ["#45a049", "#7cb342", "#ffb300", "#f4511e"],
      },
    ],
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Input
              {...register("fullName")}
              placeholder="Full Name"
              className="mb-4"
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
            <Input
              {...register("email")}
              placeholder="Email"
              className="mb-4"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              {...register("address")}
              placeholder="Address"
              className="mb-4"
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </>
        );
      case 1:
        return (
          <>
            <Input
              {...register("titleNumber")}
              placeholder="Title Number"
              className="mb-4"
            />
            {errors.titleNumber && (
              <p className="text-red-500">{errors.titleNumber.message}</p>
            )}
            <Textarea
              {...register("propertyDescription")}
              placeholder="Property Description"
              className="mb-4"
            />
            {errors.propertyDescription && (
              <p className="text-red-500">
                {errors.propertyDescription.message}
              </p>
            )}
          </>
        );
      case 2:
        return (
          <>
            <Input
              {...register("principalAmount", { valueAsNumber: true })}
              placeholder="Principal Amount"
              type="number"
              className="mb-4"
            />
            {errors.principalAmount && (
              <p className="text-red-500">{errors.principalAmount.message}</p>
            )}
            <Input
              {...register("principalAmountWords")}
              placeholder="Principal Amount in Words"
              className="mb-4"
            />
            {errors.principalAmountWords && (
              <p className="text-red-500">
                {errors.principalAmountWords.message}
              </p>
            )}
            <Input
              {...register("interestRate", { valueAsNumber: true })}
              placeholder="Interest Rate"
              type="number"
              step="0.01"
              className="mb-4"
            />
            {errors.interestRate && (
              <p className="text-red-500">{errors.interestRate.message}</p>
            )}
            <Input
              {...register("repaymentDate", { valueAsDate: true })}
              placeholder="Repayment Date"
              type="date"
              className="mb-4"
            />
            {errors.repaymentDate && (
              <p className="text-red-500">{errors.repaymentDate.message}</p>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Input
              type="file"
              onChange={(e) => handleDocumentUpload(e, "titleDeed")}
              className="mb-4"
            />
            <Input
              type="file"
              onChange={(e) => handleDocumentUpload(e, "chargeDocument")}
              className="mb-4"
            />
            <Input
              type="file"
              onChange={(e) => handleDocumentUpload(e, "personalInsurance")}
              className="mb-4"
            />
            <Input
              type="file"
              onChange={(e) => handleDocumentUpload(e, "powerOfAttorney")}
              className="mb-4"
            />
            <Input
              type="file"
              onChange={(e) =>
                handleDocumentUpload(e, "identificationDocument")
              }
              className="mb-4"
            />
          </>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Review your application
            </h3>
            <p>
              Please review all the information you've provided before
              submitting your application.
            </p>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  const renderDashboardOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Loan History</h3>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={loanHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Credit Score Distribution</h3>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <Doughnut
              data={creditScoreData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLoanSummary = () => (
    <Card className="mb-8">
      <CardHeader>
        <h3 className="text-lg font-semibold">Loan Summary</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Loans</p>
            <p className="text-xl font-bold">3</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Loans</p>
            <p className="text-xl font-bold">2</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold">$25,000</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Payment Due</p>
            <p className="text-xl font-bold">15 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Loan Dashboard</h1>

      {renderDashboardOverview()}
      {renderLoanSummary()}

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold">New Loan Application</h2>
        </CardHeader>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            {renderStepContent(activeStep)}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleSubmit(onSubmit)}>Submit Application</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoanApplicationDashboard;
