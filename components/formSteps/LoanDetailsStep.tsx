import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LoanDetailsStep = ({ register, errors }: any) => {
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
        <p className="text-red-500">{errors.principalAmountWords.message}</p>
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
};

export default LoanDetailsStep;
