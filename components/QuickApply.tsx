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
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Loan Application</h2>
        <p className="mb-4">
          Need a loan? Start your application process quickly and easily.
        </p>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTitle>{``}</DialogTitle>
          <DialogDescription>{""}</DialogDescription>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">Apply Now</Button>
          </DialogTrigger>
          <DialogContent>
            <LoanApplicationForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
