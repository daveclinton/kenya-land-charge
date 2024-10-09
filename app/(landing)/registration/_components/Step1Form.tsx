import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormSchema } from "../page";

type Step1FormProps = {
  form: UseFormReturn<FormSchema>;
  onNext: () => void;
};

const Step1Form: React.FC<Step1FormProps> = ({ form, onNext }) => {
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h4 className="text-xl font-semibold tracking-tight">
            Chargor Details
          </h4>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    autoComplete="given-name"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter chargor's full name"
                  />
                </FormControl>
                {errors.fullName && (
                  <FormMessage className="text-red-500">
                    {errors.fullName.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    autoComplete="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter chargor's email"
                  />
                </FormControl>
                {errors.email && (
                  <FormMessage className="text-red-500">
                    {errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    autoComplete="address-level1"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter chargor's address"
                  />
                </FormControl>
                {errors.address && (
                  <FormMessage className="text-red-500">
                    {errors.address.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold tracking-tight">
            Property Details
          </h4>
          <FormField
            control={form.control}
            name="titleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Number</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter property title number"
                  />
                </FormControl>
                {errors.titleNumber && (
                  <FormMessage className="text-red-500">
                    {errors.titleNumber.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="propertyDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the property"
                    className="min-h-[100px]"
                  />
                </FormControl>
                {errors.propertyDescription && (
                  <FormMessage className="text-red-500">
                    {errors.propertyDescription.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onNext}
        className="w-full bg-sky-500 hover:bg-sky-700 text-white"
      >
        Submit and Proceed
      </Button>
    </>
  );
};

export default Step1Form;
