import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormSchema } from "../page";

type Step2FormProps = {
  form: UseFormReturn<FormSchema>;
  isLoading: boolean;
};

const Step2Form: React.FC<Step2FormProps> = ({ form, isLoading }) => (
  <>
    <div className="space-y-6">
      <h4 className="text-xl font-semibold tracking-tight">Charge Details</h4>
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
      className="w-full mt-4 bg-sky-500 hover:bg-sky-700 text-white"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  </>
);

export default Step2Form;
