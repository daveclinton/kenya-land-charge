"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { formSchema } from "@/lib/validation";
import { z } from "zod";

type FormSchema = z.infer<typeof formSchema>;

export default function MyFormPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen mt-20 md:mt-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold tracking-tight">
                Charge Details
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="principalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Amount (Kshs)</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter principal amount"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="principalAmountWords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Principal Amount (in words)</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter principal amount in words"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate (%)</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter interest rate"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repaymentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repayment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full p-2 h-10 font-normal justify-start text-left",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-700 text-white"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
