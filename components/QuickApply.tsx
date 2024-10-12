"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoanApplicationForm from "@/components/LoanApplicationForm";
import { DialogTitle } from "@radix-ui/react-dialog";

export function QuickApplySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-sky-900">
          Quick Loan Application
        </h2>
        <p className="mb-4 text-sky-700">
          Need a loan? Start your application process quickly and easily.
        </p>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTitle className="text-sky-900">{""}</DialogTitle>
          <DialogDescription className="text-sky-700">{""}</DialogDescription>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white">
              Apply Now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <LoanApplicationForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
