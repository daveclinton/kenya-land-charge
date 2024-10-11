import React from "react";
import { Input } from "@/components/ui/input";

const PersonalInfoStep = ({ register, errors }: any) => {
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
      <Input {...register("email")} placeholder="Email" className="mb-4" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <Input {...register("address")} placeholder="Address" className="mb-4" />
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}
    </>
  );
};

export default PersonalInfoStep;
