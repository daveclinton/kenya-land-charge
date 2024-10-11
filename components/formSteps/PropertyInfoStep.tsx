import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PropertyInfoStep = ({ register, errors }: any) => {
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
        <p className="text-red-500">{errors.propertyDescription.message}</p>
      )}
    </>
  );
};

export default PropertyInfoStep;
